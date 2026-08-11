from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.session import get_db
from src.database.models.user import User
from src.schemas.project import ProjectResponse
from src.schemas.requests import ProjectRequest
from src.services.projects import ProjectService

from src.api.deps import get_current_user

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get('')
def get_projects(
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    service = ProjectService(db)

    projects = service.get_by_user(user=current_user)
    
    return { 
        "data": [ProjectResponse.from_model(project) for project in projects]
    }


@router.post('')
def create(
    data: ProjectRequest, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    service = ProjectService(db)

    project = service.create(current_user, data.name, data.description)

    return { "data": ProjectResponse.from_model(project) }