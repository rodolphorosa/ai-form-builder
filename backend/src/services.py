import json

from src.llm import generate_form

def generate(prompt: str):
    response = generate_form(prompt)

    parsed = json.loads(response)

    return parsed