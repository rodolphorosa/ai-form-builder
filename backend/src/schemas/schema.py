from pydantic import BaseModel

from enum import Enum

class InputType(str, Enum):
    TEXT = "text"
    EMAIL = "email"
    PASSWORD = "password"
    PHONE = "phone"
    URL = "url"
    NUMBER = "number"
    DATE = "date"
    DATETIME = "datetime"
    SELECT = "select"
    RADIO = "radio"
    CHECKBOX = "checkbox"
    TEXTAREA = "textarea"
    FILE = "file"

class Validation(BaseModel):
    minValue: int | None = None
    maxValue: int | None = None
    minLength: int | None = None
    maxLength: int | None = None
    regex: str | None = None

class Option(BaseModel):
    value: str
    label: str

class UI(BaseModel):
    placeholder: str | None = None
    helpText: str | None = None

class Item(BaseModel):
    id: str
    label: str
    type: InputType
    description: str | None = None
    required: bool = False
    disabled: bool = False
    validation: Validation | None = None
    options: list[Option] | None = None
    ui: UI | None = None

class Section(BaseModel):
    id: str
    label: str
    description: str | None = None
    items: list[Item]

class FormSchema(BaseModel):
    sections: list[Section]