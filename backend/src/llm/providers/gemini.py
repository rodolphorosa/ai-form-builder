import os

from dotenv import load_dotenv
from openai import OpenAI
# from google import genai

from src.llm.providers.base import BaseProvider

load_dotenv(override=True)

class GeminiProvider(BaseProvider):

    GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        model = os.getenv('GEMINI_MODEL', 'gemini-2.5-flash')

        if not api_key:
            raise Exception("GEMINAI_API_KEY not found")
        
        self.api_key = api_key
        self.model = model
        self.client = OpenAI(
            api_key=api_key,
            base_url=self.GEMINI_BASE_URL
        )

    def chat(self, messages: list[dict]):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            response_format={"type": "json_object"}
        )

        return response.choices[0].message.content