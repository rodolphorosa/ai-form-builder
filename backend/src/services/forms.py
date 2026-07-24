from sqlalchemy.orm import Session

from src.llm.services import generate_form_schema
from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository
from src.api.deps import get_llm_provider
from src.schemas.requests import FormRequest

class FormService:

    def __init__(self, db: Session):
        self.db = db

    def generate(self, data: FormRequest):
        provider = get_llm_provider(data.provider, data.model)
        form_schema = generate_form_schema(data.prompt, provider)

        project_reposoitory = ProjectRepository(self.db)

        default_project = project_reposoitory.get_default_project()

        if not default_project:
            raise Exception("Default project not found")
        
        form_repository = FormRepository(self.db)
        form_repository.create(
            form_schema["schema"],
            default_project.id
        )

        return form_schema