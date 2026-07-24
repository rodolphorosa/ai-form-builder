import json

from src.llm.providers.base import BaseProvider
from src.llm.prompts.form_generation import SYSTEM_PROMPT

def generate_form_schema(prompt: str, provider: BaseProvider):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": prompt}
    ]
    response = provider.chat(messages=messages)
    parsed = json.loads(response)

    return parsed