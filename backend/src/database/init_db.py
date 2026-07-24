from src.database.base import Base
from src.database.session import engine

from sqlalchemy.orm import Session

from src.database.models.project import Project
from src.database.models.form import Form

def create_default_project():
    with Session(engine) as session:
        project = (
            session.query(Project)
            .filter(Project.is_system == True)
            .first()
        )

        if not project:
            project = Project(
                name="My Forms",
                is_system=True
            )

            session.add(project)
            session.commit()


def init_db():
    Base.metadata.create_all(bind=engine)
    create_default_project()