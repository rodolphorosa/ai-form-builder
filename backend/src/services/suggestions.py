import json

from src.llm.providers.base import BaseProvider
from src.llm.prompts.field_suggestion import SYSTEM_PROMPT

def request_suggestion(prompt: str, provider: BaseProvider):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": prompt}
    ]

    response = provider.chat(messages=messages)
    parsed = json.loads(response)

    return parsed