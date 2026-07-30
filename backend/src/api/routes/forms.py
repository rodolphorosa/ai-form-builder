from fastapi import APIRouter, Depends, UploadFile, File, Form as ApiForm
from sqlalchemy.orm import Session

from uuid import UUID

from src.database.session import get_db
from src.database.models.form import Form
from src.database.models.project import Project
from src.schemas.form import FormResponse
from src.schemas.requests import BlankRequest, FormRequest, EditRequest, UpdateFormRequest
from src.services.forms import FormService, generate_form_schema
from src.api.deps import get_llm_provider
from src.llm.factory import ProviderType

from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository

router = APIRouter(prefix="/forms", tags=["Forms"])

@router.get('')
def get_forms(db: Session = Depends(get_db)):
    form_repository = FormRepository(db)
    forms = form_repository.get_all()
    
    return { "data": [FormResponse.from_model(f) for f in forms] }


@router.get('/{id}')
def get_form(id: UUID, db: Session = Depends(get_db)):
    service = FormService(db)

    form = service.get_form(id)

    return { "data": FormResponse.from_model(form) }

@router.post('/generate')
def generate_form(data: FormRequest, db: Session = Depends(get_db)):
    service = FormService(db)

    result = service.generate(data)

    llm_response = result["response"]
    form = result["form"]

    return { 
        "data": {
            "message": llm_response["message"],
            "form": FormResponse.from_model(form)
        }
    }


@router.post('/create_blank')
def create(data: BlankRequest, db: Session = Depends(get_db)):
    service = FormService(db)

    form = service.create_blank(
        name=data.name, 
        description=data.description, 
        project_id=data.project_id
    )

    return { "data": FormResponse.from_model(form) }
    

@router.post('/edit')
def edit_form(data: EditRequest, db: Session = Depends(get_db)):
    service = FormService(db)

    result = service.edit_schema_with_ai(data)

    return { "data": result }


@router.patch('/{id}')
def update_form(id: UUID, data: UpdateFormRequest, db: Session = Depends(get_db)):
    service = FormService(db)

    form = service.update(id, data)

    return { "data": FormResponse.from_model(form) }


@router.post('/generate_from_image')
async def generate_from_image(
    image: UploadFile = File(...), 
    provider: ProviderType = ApiForm(...),
    model: str = ApiForm(...),
    db: Session = Depends(get_db)
):
    service = FormService(db)

    result = await service.generate_from_image(image, provider, model)

    llm_response = result["response"]

    form = result["form"]

    return { 
        "data": {
            "message": llm_response["message"],
            "form": FormResponse.from_model(form)
        }
    }
