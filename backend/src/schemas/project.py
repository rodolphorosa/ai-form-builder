from pydantic import BaseModel
from uuid import UUID

from src.database.models.project import Project


class ProjectResponse(BaseModel):
    id: UUID
    name: str
    createdAt: int
    updatedAt: int
    pinned: bool
    archived: bool
    deleted: bool

    @classmethod
    def from_model(cls, project: Project) -> "ProjectResponse":
        return cls(
            id=project.id,
            name=project.name,
            createdAt=int(project.created_at.timestamp() * 1000),
            updatedAt=int(project.updated_at.timestamp() * 1000),
            pinned=project.is_pinned,
            archived=project.is_archived,
            deleted=project.is_deleted,
        )