from pydantic import BaseModel, Field, ConfigDict
from src.llm.factory import ProviderType
from src.schemas.schema import FormSchema

from uuid import UUID


class BlankRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str
    description: str | None = None
    project_id: UUID = Field(alias="projectId")

class FormRequest(BaseModel):
    prompt: str
    provider: ProviderType
    model: str

class EditRequest(BaseModel):
    prompt: str
    schema: dict
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
    schema: FormSchema | None = None
    pinned: bool | None = None
    archived: bool | None = None
    deleted: bool | None = None