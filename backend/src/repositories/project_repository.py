from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.project import Project

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_default_project(self) -> Project | None:
        return (
            self.db.query(Project)
            .filter(Project.is_system == True)
            .first()
        )