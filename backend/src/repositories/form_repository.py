from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.form import Form

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
    
