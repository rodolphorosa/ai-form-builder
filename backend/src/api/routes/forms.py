from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.session import get_db
from src.database.models.form import Form
from src.database.models.project import Project
from src.schemas.form import FormResponse
from src.schemas.requests import FormRequest, EditRequest
from src.services.forms import FormService, generate_form_schema
from src.api.deps import get_llm_provider

from src.repositories.form_repository import FormRepository
from src.repositories.project_repository import ProjectRepository

router = APIRouter(prefix="/forms", tags=["Forms"])

@router.get('')
def get_forms(db: Session = Depends(get_db)):
    form_repository = FormRepository(db)
    forms = form_repository.get_all()
    
    return { "data": [FormResponse.from_model(f) for f in forms] }

@router.post('/generate')
def generate_form(data: FormRequest, db: Session = Depends(get_db)):
    service = FormService(db)

    form_schema = service.generate(data)

    return { "data": form_schema }

@router.post('/edit')
def edit_form(data: EditRequest):
    provider = get_llm_provider(data.provider, data.model)
    
    form = generate_form_schema(
        f"{data.prompt}\n\n Current schema:\n {data.schema}",
        provider
    )

    return { "data": form }