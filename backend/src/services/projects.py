
from fastapi import UploadFile

from datetime import datetime, timezone

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.llm.services import generate_form_schema, edit_form_schema, generate_from_image
from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository
from src.api.deps import get_llm_provider
from src.schemas.requests import AIEditRequest, AIFormRequest, UpdateFormRequest
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

from src.database.models.project import Project
from src.database.models.user import User
from src.llm.factory import ProviderType

from uuid import uuid4

class ProjectService:

    def __init__(self, db: Session):
        self.db = db


    def create(self, user: User, name: str, description: str | None):
        repository = ProjectRepository(self.db)
        return repository.create(user, name, description)