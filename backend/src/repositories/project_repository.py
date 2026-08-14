from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.project import Project
from src.database.models.user import User

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db


    def create(self, user: User, name: str, description: str | None) -> Project:
        project = Project(
            name=name,
            description=description,
            user_id=user.id
        )

        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)

        return project


    def save(self, project: Project) -> Project:
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)

        return project


    def create_user_default_project(self, user: User) -> Project:
        project = Project(
            name="My forms",
            user_id=user.id,
            is_system=True
        )

        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)

        return project


    def get_default_project(self, user: User) -> Project | None:
        return (
            self.db.query(Project)
            .filter(Project.is_system == True)
            .filter(Project.user_id == user.id)
            .first()
        )
    

    def get_all(self, user: User) -> list[Project]:
        stmt = (
            select(Project)
            .where(Project.user_id == user.id)
            .where(Project.is_deleted.is_(False))
            .where(Project.is_archived.is_(False))
        )

        return self.db.scalars(stmt).all()
    

    def get_archived(self, user_id: UUID) -> list[Project]:
        return (
            self.db.query(Project)
            .filter(Project.user_id == user_id)
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