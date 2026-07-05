from typing import Protocol

class BaseProvider(Protocol):
   def chat(self, messages: list[dict]):
      pass
