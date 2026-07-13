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