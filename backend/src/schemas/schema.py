from pydantic import BaseModel

from enum import Enum
from uuid import UUID

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
    RATING = "rating"


class Validation(BaseModel):
    minValue: int | None = None
    maxValue: int | None = None
    minLength: int | None = None
    maxLength: int | None = None
    regex: str | None = None
    maxSize: int | None = None
    minFiles: int | None = None
    maxFiles: int | None = None
    acceptedTypes: list[str] | None = None


class Option(BaseModel):
    value: str
    label: str


class UI(BaseModel):
    placeholder: str | None = None
    helpText: str | None = None


class ItemBase(BaseModel):
    name: str
    label: str
    type: InputType
    description: str | None = None
    required: bool = False
    disabled: bool = False
    validation: Validation | None = None
    options: list[Option] | None = None
    ui: UI | None = None


class Item(ItemBase):
    id: str


class LLMItem(ItemBase):
    pass


class SectionBase(BaseModel):
    name: str
    label: str
    description: str | None = None
    

class Section(SectionBase):
    id: str
    items: list[Item]


class LLMSection(SectionBase):
    items: list[ItemBase]
    

class FormSchema(BaseModel):
    sections: list[Section]


class LLMFormSchema(BaseModel):
    sections: list[LLMSection]


class Form(BaseModel):
    name: str
    description: str | None = None
    schema: FormSchema


class IdRegistry(BaseModel):
    sections: dict[str, UUID]
    items: dict[str, UUID]