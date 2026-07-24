from pydantic import BaseModel
from src.llm.factory import ProviderType


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