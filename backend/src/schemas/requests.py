from pydantic import BaseModel, Field, ConfigDict
from src.llm.factory import ProviderType
from src.schemas.schema import Form, FormSchema, Role
from src.schemas.user_settings import AI, Appearance

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


class AISuggestionRequest(BaseModel):
    subject: dict
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


class SendMessageRequest(BaseModel):
    role: Role
    content: str
    snapshot: FormSchema | None = None


class UserSettingsRequest(BaseModel):
    ai: dict | None = None
    appearance: dict | None = None


class LoginRequest(BaseModel):
    email: str
    password: str


class UserRequest(BaseModel):
    name: str
    email: str
    password: str