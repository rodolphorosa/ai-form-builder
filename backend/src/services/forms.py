from fastapi import UploadFile

from datetime import datetime, timezone

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.llm.services import generate_form_schema, edit_form_schema, generate_from_image
from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository
from src.api.deps import get_llm_provider
from src.schemas.requests import EditRequest, FormRequest, UpdateFormRequest
from src.schemas.schema import (
    Form, 
    FormSchema, 
    LLMFormSchema, 
    LLMItem, 
    LLMSection, 
    Section, 
    Item, 
    IdRegistry
)
from src.llm.factory import ProviderType

from uuid import uuid4


class FormService:

    def __init__(self, db: Session):
        self.db = db

    def _assign_ids(self, llm_schema: LLMFormSchema) -> FormSchema:
        sections = []

        for llm_section in llm_schema.sections:
            items = []

            for llm_item in llm_section.items:
                items.append(
                    Item(
                        id=str(uuid4()),
                        **llm_item.model_dump()
                    )
                )

            sections.append(
                Section(
                    id=str(uuid4()),
                    items=items,
                    **llm_section.model_dump(exclude={"items"})
                )
            )

        return FormSchema(sections=sections)


    def _merge_ids(self, llm_schema: LLMFormSchema, id_registry: IdRegistry) -> FormSchema:
        sections = []
        
        for llm_section in llm_schema.sections:
            items = []

            for llm_item in llm_section.items:
                item_id = id_registry.items.get(llm_item.name, str(uuid4()))
                items.append(
                    Item(
                        id=item_id,
                        **llm_item.model_dump()
                    )
                )

            section_id = id_registry.sections.get(llm_section.name, str(uuid4()))
            sections.append(
                Section(
                    id=section_id,
                    items=items,
                    **llm_section.model_dump(exclude={"items"})
                )
            )

        return FormSchema(sections=sections)


    def create_with_ai(self, data: FormRequest):
        provider = get_llm_provider(data.provider, data.model)
        response = generate_form_schema(data.prompt, provider)

        project_reposoitory = ProjectRepository(self.db)

        default_project = project_reposoitory.get_default_project()

        if not default_project:
            raise Exception("Default project not found")
        
        form_repository = FormRepository(self.db)

        llm_schema = LLMFormSchema.model_validate(response["schema"])

        form_schema = self._assign_ids(llm_schema=llm_schema)
        
        form = form_repository.create(
            name=response.get("title", "Unnamed form"),
            description=response.get("description", None),
            schema=form_schema.model_dump(),
            project_id=default_project.id
        )

        return { "response": response, "form": form }
    

    def create_blank(self, name: str, description: str | None, project_id: UUID):
        project_repository = ProjectRepository(self.db)

        project = project_repository.get_by_id(project_id)

        if not project:
            raise Exception("Project not found")
        
        form_repository = FormRepository(self.db)

        schema = FormSchema(
            sections=[
                {
                    "id": str(uuid4()), 
                    "name": "section", 
                    "label": "Section", 
                    "items": []
                }
            ]
        )

        form = form_repository.create(
            name=name,
            description=description,
            schema=schema.model_dump(),
            project_id=project_id
        )

        return form


    def create_from_json(self, form: Form):
        project_repository = ProjectRepository(self.db)

        default_project = project_repository.get_default_project()

        if not default_project:
            raise Exception("Default project not found")

        form_repository = FormRepository(self.db)

        validated_schema = FormSchema.model_validate(form.schema)

        return form_repository.create(
            name=form.name,
            description=form.description,
            schema=validated_schema.model_dump(),
            project_id=default_project.id
        )


    async def create_from_image(self, image: UploadFile, provider_type: ProviderType, model: str):
        provider = get_llm_provider(provider_type=provider_type, model=model)

        content_type = image.content_type
        image_bytes = await image.read()

        response = generate_from_image(image_bytes, content_type, provider)

        project_reposoitory = ProjectRepository(self.db)
        
        default_project = project_reposoitory.get_default_project()

        if not default_project:
            raise Exception("Default project not found")
        
        form_repository = FormRepository(self.db)

        llm_schema = LLMFormSchema.model_validate(response["schema"])
        
        form_schema = self._assign_ids(llm_schema=llm_schema)
        
        form = form_repository.create(
            name=response.get("title", "Unnamed form"),
            description=response.get("description", None),
            schema=form_schema.model_dump(),
            project_id=default_project.id
        )

        return { "response": response, "form": form }
    

    def edit_schema_with_ai(self, data: EditRequest):
        current_form = data.form
        current_schema = current_form.schema

        id_registry = IdRegistry(
            sections={},
            items={}
        )

        sanitized_sections = []

        for section in current_schema.sections:
            id_registry.sections[section.name] = section.id

            sanitized_items = []

            for item in section.items:
                id_registry.items[item.name] = item.id

                sanitized_items.append(
                    LLMItem(
                        **item.model_dump(exclude={"id"})
                    )
                )

            sanitized_sections.append(
                LLMSection(
                    name=section.name,
                    label=section.label,
                    description=section.description,
                    items=sanitized_items,
                )
            )

        sanitized_schema = LLMFormSchema(
            sections=sanitized_sections
        )

        sanitized_form = {
            "title": current_form.name,
            "description": current_form.description,
            "schema": sanitized_schema
        }

        prompt = f""""
            {data.prompt} \n\n
            Current form: \n\n
            {sanitized_form}
        """
        provider = get_llm_provider(data.provider, data.model)

        response = edit_form_schema(prompt, provider)

        llm_schema = LLMFormSchema.model_validate(response["schema"])

        form_schema = self._merge_ids(llm_schema=llm_schema, id_registry=id_registry)

        message = response["message"]
        title = response["title"]
        description = response["description"]

        return { "message": message, "title": title, "description": description, "schema": form_schema }


    def get_form(self, id: UUID):
        form_repository = FormRepository(self.db)

        form = form_repository.get_by_id(id)

        if not form:
            raise Exception("Form not found")

        return form

    def update(self, id: UUID, request: UpdateFormRequest):
        repository = FormRepository(self.db)
        form = repository.get_by_id(id)

        updates = request.model_dump(exclude_unset=True)

        for field, value in updates.items():
            setattr(form, field, value)

        form.updated_at = datetime.now(timezone.utc)

        return repository.save(form)
