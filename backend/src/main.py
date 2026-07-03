import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.mock import *
from src.services import generate

app = FastAPI(
    title="Smart FormBuilder",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class FormRequest(BaseModel):
    prompt: str


@app.get('/')
def home():
    return { "message": "Hello, form builder!" }


@app.get('/schema')
def get_schema():
    return { "data": schema }


@app.post('/generate-form')
def generate_form(data: FormRequest):
    form = generate(data.prompt)

    return { "data": form }




if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )