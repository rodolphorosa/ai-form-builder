from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.llm.services import generate_form_schema, edit_form_schema
from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository
from src.api.deps import get_llm_provider
from src.schemas.requests import EditRequest, FormRequest
from src.schemas.schema import FormSchema


class FormService:

    def __init__(self, db: Session):
        self.db = db

    def generate(self, data: FormRequest):
        provider = get_llm_provider(data.provider, data.model)
        response = generate_form_schema(data.prompt, provider)

        project_reposoitory = ProjectRepository(self.db)

        default_project = project_reposoitory.get_default_project()

        if not default_project:
            raise Exception("Default project not found")
        
        form_repository = FormRepository(self.db)

        validated_schema = FormSchema.model_validate(response["schema"])
        
        form = form_repository.create(
            name=response.get("title", "Unnamed form"),
            description=response.get("description", None),
            schema=validated_schema.model_dump(),
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
            title=name,
            sections=[]
        )

        form = form_repository.create(
            name=name,
            description=description,
            schema=schema.model_dump(),
            project_id=project_id
        )

        return form
    

    def edit_schema_with_ai(self, data: EditRequest):
        prompt = f"{data.prompt} \n\n Current schema:\n\n{data.schema}"
        provider = get_llm_provider(data.provider, data.model)
        response = edit_form_schema(prompt, provider)

        return response
