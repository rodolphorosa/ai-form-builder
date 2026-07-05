"use client"

import React, {FC, useEffect, useState} from "react"
import { Field, FormSchema, InputType, InputTypes, Section } from "../types/form"
import { TextInput } from "./inputs/text"
import { NumberInput } from "./inputs/number"
import { TextareaInput } from "./inputs/textarea"
import { DateInput } from "./inputs/date"
import { DatetimeInput } from "./inputs/datetime"
import { SelectInput } from "./inputs/select"
// import { Section } from "./section"

interface BuilderProps {
    // schema: FormSchema
}

export const Builder: FC<BuilderProps> = ({}) => {
    const [schema, setSchema] = useState<FormSchema | null>(null)
    const [description, setDescription] = useState<string>("")

    const fieldStrategies: Record<InputType, React.ComponentType<{field: Field}>> = {
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
    }

    const renderField = (field: Field) => {

        const Component = fieldStrategies[field.type]

        if(!Component) {
            return (<div>Unsupported input type</div>)
        }

        return <Component field={field} />

    }

    const renderSection = (section: Section) => {
        return (
            <div>
                <h3>{section.label}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    { section.fields.map(field => renderField(field)) }
                </div>
            </div>
        )
    }

    async function generateForm() {
        const response = await fetch(
            "/api/generate-form",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: description,
                provider: "openai"
            }),
            }
        );

        const data = await response.json();

        setSchema(data?.data??{});
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        generateForm()
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>{ schema?.sections.map(section => renderSection(section)) }</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>Describe your form</div>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        minLength={20} 
                        maxLength={200} 
                        placeholder="Form description..." 
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}