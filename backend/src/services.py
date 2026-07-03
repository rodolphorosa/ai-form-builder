import json

from src.llm.providers.base import BaseProvider

system_prompt = """
You are a structured form builder. 
Your role is to convert natural language description of forms into a JSON schema form.

The schema is as follows:

{
    title: Name of the form,
    sections: [
        {
            id: Unique identifier of the section,
            label: Section label,
            fields: [
                {
                    id: Field id,
                    label: Field label,
                    type: Type of the field. Can be any of the valid input types,
                    required: Whether the field is required or not,
                    readonly: Whether the field can have its value edited or not,
                    validation: {
                        minValue: Minumum value,
                        maxValue: Maximum value,
                        minLength: Minimum number of characters,
                        maxLength: Maximum number of characters
                    },
                    options: [
                        List of possible values
                    ],
                    ui: {
                        placeholder: Field placeholder,
                    }
                },
            ]
        },
    ]
}

Valid input types:
- text
- email
- password
- phone
- url
- textarea
- number
- date 
- datetime 
- select
- radio
- checkbox

Rules:
- Return only valid JSON.
- All ids must be unique.
- All ids must be in snake_case

"""

def generate_form_schema(prompt: str, provider: BaseProvider):
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]
    response = provider.chat(messages=messages)
    parsed = json.loads(response)

    return parsed