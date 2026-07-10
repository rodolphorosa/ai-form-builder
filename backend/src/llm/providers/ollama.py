import os

from dotenv import load_dotenv
from openai import OpenAI

from src.llm.providers.base import BaseProvider

load_dotenv(override=True)

class OllamaProvider(BaseProvider):

    def __init__(self, model):
        self.client = OpenAI(
            base_url="http://localhost:11434/v1",
            api_key="ollama"
        )

        self.model = model

    def chat(self, messages: list[dict]):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            response_format={"type": "json_object"}
        )

        return response.choices[0].message.content