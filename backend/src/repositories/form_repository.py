from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.form import Form

class FormRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, schema: dict, project_id: UUID):
        form = Form(
            name=schema.get("title", "Unnamed form"),
            description=schema.get("description"),
            schema=schema,
            project_id=project_id
        )

        self.db.add(form)
        self.db.commit()
        self.db.refresh(form)

        return form
    
    def get_all(self):
        return self.db.query(Form).filter(Form.is_deleted == False).all()