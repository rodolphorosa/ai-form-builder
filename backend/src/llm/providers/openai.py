import os

from dotenv import load_dotenv
from openai import OpenAI

from src.llm.providers.base import BaseProvider

load_dotenv(override=True)

class OpenaiProvider(BaseProvider):

    def __init__(self, model):
        api_key = os.getenv('OPENAI_API_KEY')

        if not api_key:
            raise Exception("OPENAI_API_KEY not found")
        
        self.api_key = api_key
        self.model = model
        self.client = OpenAI(api_key=api_key)

    
    def chat(self, messages: list[dict]):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            response_format={"type": "json_object"}
        )

        return response.choices[0].message.content

    