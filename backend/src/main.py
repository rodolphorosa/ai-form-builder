import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from enum import Enum

from src.mock import *
from src.services import generate_form_schema, request_suggestion
from src.llm.providers.openai import OpenaiProvider
from src.llm.providers.ollama import OllamaProvider
from src.llm.providers.gemini import GeminiProvider

app = FastAPI(
    title="Smart FormBuilder",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class ProviderType(str, Enum):
    OPENAI = "openai"
    GEMINI = "gemini"
    OLLAMA = 'ollama'

PROVIDERS = {
    ProviderType.OPENAI: OpenaiProvider,
    ProviderType.GEMINI: GeminiProvider,
    ProviderType.OLLAMA: OllamaProvider,
}

CONTEXTS = {
    "properties": ["label", "description", "ui.placeholder", "ui.helpText", "required", "disabled"],
    "options": ["options"],
    "validation": ["minValue", "maxValue", "minLength", "maxLength", "regex"]
}

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

@app.get('/')
def home():
    return { "message": "Hello, form builder!" }

@app.post('/generate-form')
def generate_form(data: FormRequest):
    provider_cls = PROVIDERS.get(data.provider)
    provider = provider_cls(model=data.model)
    form = generate_form_schema(data.prompt, provider)

    return { "data": form }


@app.post('/edit-form')
def edit_form(data: EditRequest):
    provider_cls = PROVIDERS.get(data.provider)
    provider = provider_cls(model=data.model)
    
    form = generate_form_schema(
        f"{data.prompt}\n\n Current schema:\n {data.schema}",
        provider
    )

    return { "data": form }

@app.post('/suggestion')
def suggest(data: SuggestionRequest):
    provider_cls = PROVIDERS.get(data.provider)
    provider = provider_cls(model=data.model)

    print(CONTEXTS[data.context])

    prompt = f"""
        Suggest improvements to {data.subject["label"]}.
        Your task is NOT to improve the whole field.

        Your task is to inspect ONLY the following properties:

        {CONTEXTS[data.context]}

        Ignore every other property of the field, even if it could be improved.

        Treat every other property as read-only.

        Current field: \n\n {data.subject}
        \n\n
    """

    suggestions = request_suggestion(prompt, provider)

    return {"data": suggestions}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )   
