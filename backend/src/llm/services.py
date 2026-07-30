import json
import base64

from src.llm.providers.base import BaseProvider
from src.llm.prompts.form_generation import SYSTEM_PROMPT as CREATION_PROMPT
from src.llm.prompts.schema_edition import SYSTEM_PROMPT as EDITION_PROMPT
from src.llm.prompts.image_parsing import SYSTEM_PROMPT as IMAGE_PROMPT

def generate_form_schema(prompt: str, provider: BaseProvider):
    messages = [
        {"role": "system", "content": CREATION_PROMPT},
        {"role": "user", "content": prompt}
    ]
    response = provider.chat(messages=messages)
    parsed = json.loads(response)

    return parsed


def edit_form_schema(prompt: str, provider: BaseProvider):
    messages = [
        {"role": "system", "content": EDITION_PROMPT},
        {"role": "user", "content": prompt}
    ]
    response = provider.chat(messages=messages)
    parsed = json.loads(response)

    return parsed


def generate_from_image(image: bytes, content_type: str, provider: BaseProvider):
    encoded_image = base64.b64encode(image).decode("utf-8")

    image_url = f"data:{content_type};base64,{encoded_image}"

    messages = [
        {"role": "system", "content": EDITION_PROMPT},
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Convert this image to form schema"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": image_url
                    }
                }
            ]
        }
    ]

    response = provider.chat(messages=messages)

    parsed = json.loads(response)

    return parsed