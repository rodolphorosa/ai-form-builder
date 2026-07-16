import React from "react"
import { InputType, Item } from "../types/form"
import { CheckboxInput } from "./inputs/checkbox"
import { DateInput } from "./inputs/date"
import { DatetimeInput } from "./inputs/datetime"
import { NumberInput } from "./inputs/number"
import { RadioInput } from "./inputs/radio"
import { SelectInput } from "./inputs/select"
import { TextInput } from "./inputs/text"
import { TextareaInput } from "./inputs/textarea"

import { Calendar, CalendarClock, CircleDot, Container, Hash, Link, List, Lock, Mail, Phone, SquareCheck, Text, TextInitial, Type } from "lucide-react"
import { State } from "../types/inputs"

export const itemStrategies: Record<InputType, React.ComponentType<{item: Item}>> = {
    text: TextInput,
    email: TextInput,
    password: TextInput,
    phone: TextInput,
    url: TextInput,
    textarea: TextareaInput,
    number: NumberInput,
    date: DateInput,
    datetime: DatetimeInput,
    select: SelectInput,
    radio: RadioInput,
    checkbox: CheckboxInput
}

export const strategyIcons: Record<InputType, React.ComponentType> = {
    text: Type,
    email: Mail,
    password: Lock,
    phone: Phone,
    url: Link,
    textarea: TextInitial,
    number: Hash,
    date: Calendar,
    datetime: CalendarClock,
    select: List,
    radio: CircleDot,
    checkbox: SquareCheck,
    // group: Container
}

export const typesNames: Record<InputType, string> = {
    text: "Text",
    email: "E-mail",
    password: "Password",
    phone: "Phone",
    url: "Link",
    textarea: "Textarea",
    number: "Number",
    date: "Date Picker",
    datetime: "DateTime Picker",
    select: "Select",
    radio: "Radio",
    checkbox: "Checkbox",
    group: "Group"
}

export const operations: Record<string, string> = {
    // Equality
    EQUALS: "equals",
    NOT_EQUALS: "not_equals",

    // Comparison
    GREATER_THAN: "greater_than",
    GREATER_THAN_OR_EQUALS: "greater_than_or_equals",
    LESS_THAN: "less_than",
    LESS_THAN_OR_EQUALS: "less_than_or_equals",
    BETWEEN: "between",

    // Text
    CONTAINS: "contains",
    NOT_CONTAINS: "not_contains",
    STARTS_WITH: "starts_with",
    ENDS_WITH: "ends_with",

    // Collections (MultiSelect, arrays, etc.)
    INCLUDES: "includes",
    NOT_INCLUDES: "not_includes",

    // Nullability
    IS_EMPTY: "is_empty",
    IS_NOT_EMPTY: "is_not_empty",
}

export const operationsNames: Record<string, string> = {
    equals: "is",
    not_equals: "is not",

    greater_than: "is greater than",
    greater_than_or_equals: "is greater than or equal to",
    less_than: "is less than",
    less_than_or_equals: "is less than or equal to",
    between: "is between",

    contains: "contains",
    not_contains: "does not contain",
    starts_with: "starts with",
    ends_with: "ends with",

    includes: "includes",
    not_includes: "does not include",

    is_empty: "is empty",
    is_not_empty: "is not empty",
}

export const itemStates: Record<State, string> = {
    "visible": "Visible state",
    "required": "Required state",
    "disabled": "Disabled state",
}

export const REGEX = {
  // Email
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // URL (http ou https)
  URL: /^https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*$/i,

  // CEP
  CEP: /^\d{5}-?\d{3}$/,

  // CPF (formato)
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,

  // CNPJ (formato)
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/,

  // CPF ou CNPJ
  CPF_CNPJ: /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/,

  // Telefone brasileiro
  PHONE_BR: /^(?:\+55\s?)?(?:\(?\d{2}\)?[\s-]?)?(?:9\d{4}|\d{4})-?\d{4}$/,

  // Apenas números
  NUMBERS: /^\d+$/,

  // Apenas letras (incluindo acentos)
  LETTERS: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,

  // Letras e números
  ALPHANUMERIC: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,

  // Apenas letras maiúsculas
  UPPERCASE: /^[A-ZÀ-ÖØ-Þ\s]+$/,

  // Apenas letras minúsculas
  LOWERCASE: /^[a-zà-öø-ÿ\s]+$/,

  // Slug
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // UUID v4
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // IPv4
  IPV4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,

  // IPv6 (simplificado)
  IPV6: /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1|::)$/,

  // Cor hexadecimal
  HEX_COLOR: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,

  // Hora (24h)
  TIME_24H: /^(?:[01]\d|2[0-3]):[0-5]\d$/,

  // Data (dd/mm/yyyy)
  DATE_BR: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,

  // Ano (1900-2099)
  YEAR: /^(19|20)\d{2}$/,

  // Senha forte
  STRONG_PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-])[A-Za-z\d@$!%*?&.#_\-]{8,}$/,

  // Nome de usuário
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,

  // Domínio
  DOMAIN: /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/,

  // MAC Address
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,

  // Base64
  BASE64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
}

export const propertyNames: Record<string, string> = {
    title: "title",
    label: "label",
    description: "description",
    placeholder: "placeholder",
    helpText: "help text",
    required: "required",
    disabled: "disabled",
    minValue: "minimum value",
    maxValue: "maximum value",
    minLength: "minimum length",
    maxLength: "maximum length",
    regex: "regex",
}