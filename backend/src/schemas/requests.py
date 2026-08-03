from pydantic import BaseModel, Field, ConfigDict
from src.llm.factory import ProviderType
from src.schemas.schema import Form, FormSchema

from uuid import UUID

class JsonFormRequest(BaseModel):
    form: Form


class BlankFormRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str
    description: str | None = None
    project_id: UUID = Field(alias="projectId")


class AIFormRequest(BaseModel):
    prompt: str
    provider: ProviderType
    model: str


class AIEditRequest(BaseModel):
    prompt: str
    form: Form
    provider: ProviderType
    model: str


class SuggestionRequest(BaseModel):
    schema: dict
    subject: dict
    context: str
    provider: ProviderType
    model: str


class UpdateFormRequest(BaseModel):
    name: str | None = None
    description: str | None = None
    project_id: UUID | None = Field(None, alias="projectId")
    schema: FormSchema | None = None
    is_pinned: bool | None = Field(None, alias="pinned")
    is_archived: bool | None = Field(None, alias="archived")
    is_deleted: bool | None = Field(None, alias="deleted")


class ProjectRequest(BaseModel):
    name: str
    description: str | None = None