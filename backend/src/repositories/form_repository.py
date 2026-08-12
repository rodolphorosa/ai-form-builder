from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.form import Form
from src.database.models.project import Project
from src.database.models.user import User

class FormRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, name: str, description: str | None, schema: dict, project_id: UUID) -> Form:
        form = Form(
            name=name,
            description=description,
            schema=schema,
            project_id=project_id
        )

        self.db.add(form)
        self.db.commit()
        self.db.refresh(form)

        return form

    def save(self, form: Form) -> Form:
        self.db.add(form)
        self.db.commit()
        self.db.refresh(form)

        return form
    
    
    def get_all(self) -> list[Form]:
        return self.db.query(Form).filter(Form.is_deleted == False).all()
    

    def get_archived(self) -> list[Form]:
        return self.db.query(Form).filter(Form.is_archived == True).all()
    

    def get_deleted(self) -> list[Form]:
        return self.db.query(Form).filter(Form.is_deleted == True).all()
    
    
    def get_by_id(self, id: UUID) -> Form:
        return self.db.query(Form).filter(Form.id == id).first()
    

    def get_by_project(self, project_id: UUID) -> list[Form]:
        return self.db.query(Form).filter(Form.project_id == project_id).all()

    def get_by_user(self, user_id: UUID) -> list[Form]:
        stmt = (
            select(Form)
            .join(Project, Form.project_id == Project.id)
            .where(Project.user_id == user_id)
            .where(Form.is_archived == False)
            .where(Form.is_deleted == False)
        )

        result = self.db.execute(stmt)
        forms = result.scalars().all()

        return forms
    

    def delete(self, form: Form):
        form.is_deleted = True
        self.db.commit()
        self.db.refresh(form)

        return form
    
    
    def archive(self, form: Form):
        form.is_archived = True
        self.db.commit()
        self.db.refresh(form)
        
        return form
    

    def pin(self, form: Form):
        form.is_pinned = True
        self.db.commit()
        self.db.refresh(form)

        return form
    

    def restore(self, form: Form):
        form.is_deleted = False
        self.db.commit()
        self.db.refresh(form)

        return form
    

    def unarchive(self, form: Form):
        form.is_archived = False
        self.db.commit()
        self.db.refresh(form)

        return form
    

    def unpin(self, form: Form):
        form.is_pinned = False
        self.db.commit()
        self.db.refresh(form)

        return form
    
