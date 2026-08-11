from fastapi import APIRouter, Depends, UploadFile, File, Form as ApiForm, HTTPException
from sqlalchemy.orm import Session

from uuid import UUID

from src.database.session import get_db
from src.database.models.form import Form
from src.database.models.project import Project
from src.database.models.user import User
from src.schemas.form import FormResponse
from src.schemas.requests import AISuggestionRequest, BlankFormRequest, AIFormRequest, AIEditRequest, UpdateFormRequest, JsonFormRequest, SendMessageRequest
from src.services.forms import FormService, generate_form_schema
from src.services.chat import ChatService

from src.api.deps import get_current_user, get_llm_provider
from src.llm.factory import ProviderType

from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository

from src.schemas.message import MessageResponse

from src.domain.exceptions.form import FormAccessDenied, FormNotFound

router = APIRouter(prefix="/forms", tags=["Forms"])

@router.get('')
def get_forms(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    form_repository = FormRepository(db)
    forms = form_repository.get_by_user(user_id=current_user.id)
    
    return { "data": [FormResponse.from_model(f) for f in forms] }


@router.get('/{id}')
def get_form(
    id: UUID, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = FormService(db)

    try:
        form = service.get_form(current_user, id)
    except FormNotFound:
        raise HTTPException(
            status_code=404,
            detail="Form not found"
        )
    except FormAccessDenied:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized"
        )

    return { "data": FormResponse.from_model(form) }


@router.patch('/{id}')
def update_form(id: UUID, data: UpdateFormRequest, db: Session = Depends(get_db)):
    service = FormService(db)

    form = service.update(id, data)

    return { "data": FormResponse.from_model(form) }


@router.post('/create_with_ai')
def create_with_ai(
    data: AIFormRequest, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    service = FormService(db)

    result = service.create_with_ai(current_user, data)

    llm_response = result["response"]
    form = result["form"]

    return { 
        "data": {
            "message": llm_response["message"],
            "form": FormResponse.from_model(form)
        }
    }


@router.post('/create_from_json')
def create_from_json(
    data: JsonFormRequest, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    service = FormService(db)

    form = service.create_from_json(current_user, data.form)

    return { "data": FormResponse.from_model(form) }


@router.post('/create_blank')
def create_blank(
    data: BlankFormRequest, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    service = FormService(db)

    form = service.create_blank(
        name=data.name, 
        description=data.description, 
        project_id=data.project_id
    )

    return { "data": FormResponse.from_model(form) }
    

@router.post('/create_from_image')
async def create_from_image(
    image: UploadFile = File(...), 
    provider: ProviderType = ApiForm(...),
    model: str = ApiForm(...),
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    service = FormService(db)

    result = await service.create_from_image(current_user, image, provider, model)

    llm_response = result["response"]

    form = result["form"]

    return { 
        "data": {
            "message": llm_response["message"],
            "form": FormResponse.from_model(form)
        }
    }


@router.post('/edit')
def edit_form(data: AIEditRequest, db: Session = Depends(get_db)):
    service = FormService(db)

    result = service.edit_schema_with_ai(data)

    message = result["message"]
    title = result["title"]
    description = result["description"]
    schema = result["schema"]

    return {
        "data": {
            "message": message,
            "form": {
                "name": title,
                "description": description,
                "schema": schema
            }
        }
    }


@router.get('/{id}/conversation')
def get_conversation(id: UUID, db: Session = Depends(get_db)):
    service = ChatService(db)

    conversation = service.get_conversation(form_id=id)

    return {
        "data": {
            "id": conversation["id"],
            "messages": [MessageResponse.from_model(message) for message in conversation["messages"]]
        }
    }


@router.post('/{id}/conversation/messages')
def send_message(
    id: UUID, 
    data: SendMessageRequest, 
    db: Session = Depends(get_db)
):
    service = ChatService(db)

    message = service.create_message(
        form_id=id,
        role=data.role,
        content=data.content,
        snapshot=data.snapshot
    )

    return { "data": MessageResponse.from_model(message) }


@router.post('/{id}/suggestions')
def get_suggestions(
    id: UUID, 
    data: AISuggestionRequest, 
    db: Session = Depends(get_db)
):
    service = FormService(db)

    suggestions = service.request_suggestions(data)

    return { "data": suggestions }