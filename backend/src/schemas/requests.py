from pydantic import BaseModel, Field, ConfigDict
from src.llm.factory import ProviderType

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