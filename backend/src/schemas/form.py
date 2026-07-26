from pydantic import BaseModel
from uuid import UUID

from src.database.models.form import Form
from src.schemas.schema import FormSchema

class FormResponse(BaseModel):
    id: UUID
    name: str
    description: str | None = None
    schema: FormSchema
    projectId: UUID
    createdAt: int
    updatedAt: int
    pinned: bool
    archived: bool
    deleted: bool

    @classmethod
    def from_model(cls, form: Form) -> "FormResponse":
        return cls(
            id = form.id,
            name = form.name,
            description = form.description,
            schema = form.schema,
            projectId = form.project_id,
            createdAt = int(form.created_at.timestamp() * 1000),
            updatedAt = int(form.updated_at.timestamp() * 1000),
            pinned = form.is_pinned,
            archived = form.is_archived,
            deleted = form.is_deleted
        )