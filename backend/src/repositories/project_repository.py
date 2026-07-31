from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.project import Project

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db


    def create(self, name: str, description: str | None) -> Project:
        project = Project(
            name=name,
            description=description
        )

        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)

        return project


    def get_default_project(self) -> Project | None:
        return (
            self.db.query(Project)
            .filter(Project.is_system == True)
            .first()
        )
    

    def get_all(self) -> list[Project]:
        return (
            self.db.query(Project)
            .filter(Project.is_deleted == False)
            .all()
        )
    

    def get_archived(self) -> list[Project]:
        return (
            self.db.query(Project)
            .filter(Project.is_archived == True)
            .all()
        )
    

    def get_deleted(self) -> list[Project]:
        return (
            self.db.query(Project)
            .filter(Project.is_deleted == True)
            .all()
        )
    
    def get_by_id(self, id: UUID) -> Project | None:
        return (
            self.db.query(Project)
            .filter(Project.id == id)
            .first()
        )
    

    def deleted(self, project: Project) -> Project:
        project.is_deleted = True
        self.db.commit()
        self.db.refresh(project)

        return project
    

    def archive(self, project: Project) -> Project:
        project.is_archived = True
        self.db.commit()
        self.db.refresh(project)

        return project
    

    def pin(self, project: Project) -> Project:
        project.is_pinned = True
        self.db.commit()
        self.db.refresh(project)

        return project
    

    def restore(self, project: Project) -> Project:
        project.is_deleted = False
        self.db.commit()
        self.db.refresh(project)

        return project
    

    def unarchive(self, project: Project) -> Project:
        project.is_archived = False
        self.db.commit()
        self.db.refresh(project)

        return project
    

    def unpin(self, project: Project) -> Project:
        project.is_pinned = False
        self.db.commit()
        self.db.refresh(project)

        return project