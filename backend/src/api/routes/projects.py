from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.session import get_db
from src.database.models.project import Project
from src.schemas.project import ProjectResponse
from src.schemas.requests import ProjectRequest
from src.services.projects import ProjectService

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get('')
def get_projects(db: Session = Depends(get_db)):

    projects = (
        db.query(Project)
        .filter(Project.is_deleted == False)
        .all()
    )
    
    return { 
        "data": [ProjectResponse.from_model(project) for project in projects]
    }


@router.post('')
def create(data: ProjectRequest, db: Session = Depends(get_db)):
    service = ProjectService(db)

    project = service.create(data.name, data.description)

    return { "data": ProjectResponse.from_model(project) }
