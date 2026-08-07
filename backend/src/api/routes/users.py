

from fastapi import APIRouter, Depends, UploadFile, File, Form as ApiForm
from sqlalchemy.orm import Session

from uuid import UUID

from src.database.session import get_db
from src.database.models.form import Form
from src.database.models.project import Project
from src.schemas.form import FormResponse
from src.schemas.requests import AISuggestionRequest, BlankFormRequest, AIFormRequest, AIEditRequest, LoginRequest, UpdateFormRequest, JsonFormRequest, SendMessageRequest
from src.services.forms import FormService, generate_form_schema
from src.services.chat import ChatService
from src.services.user import UserService

from src.api.deps import get_llm_provider
from src.llm.factory import ProviderType

from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository

from src.schemas.message import MessageResponse
from src.schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get('/{id}')
def get_user(id: UUID, db: Session = Depends(get_db)):
    service = UserService(db)


@router.post('/login')
def login(data: LoginRequest, db: Session = Depends(get_db)):

    service = UserService(db)

    result = service.get_user_and_settings(email=data.email)

    user = result["user"]
    settings = result["settings"]

    return {
        "data": UserResponse.from_model(user=user, settings=settings)
    }