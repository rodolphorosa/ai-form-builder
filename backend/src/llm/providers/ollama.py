import os

from dotenv import load_dotenv
from openai import OpenAI

from src.llm.providers.base import BaseProvider

load_dotenv(override=True)

class OllamaProvider(BaseProvider):

    def __init__(self):
        self.client = OpenAI(
            base_url="http://localhost:11434/v1",
            api_key="ollama"
        )

    def chat(self, messages: list[dict]):
        response = self.client.chat.completions.create(
            model="llama3.2",
            messages=messages,
            response_format={"type": "json_object"}
        )

        return response.choices[0].message.content