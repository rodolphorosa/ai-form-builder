from src.llm.providers.openai import OpenaiProvider
from src.llm.providers.gemini import GeminiProvider
from src.llm.providers.ollama import OllamaProvider

from enum import Enum

class ProviderType(str, Enum):
    OPENAI = "openai"
    GEMINI = "gemini"
    OLLAMA = 'ollama'

PROVIDERS = {
    ProviderType.OPENAI: OpenaiProvider,
    ProviderType.GEMINI: GeminiProvider,
    ProviderType.OLLAMA: OllamaProvider,
}