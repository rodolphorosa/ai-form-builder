"use client"

import React, {FC, useEffect, useState} from "react"
import { Field, FormSchema, InputTypes, Section } from "../types/form"
import Select from "react-select"
import { snakeCase } from "lodash"
import { TextInput } from "./inputs/text"
// import { Section } from "./section"

interface BuilderProps {
    // schema: FormSchema
}

export const Builder: FC<BuilderProps> = ({}) => {
    const [schema, setSchema] = useState<FormSchema | null>(null)
    const [description, setDescription] = useState<string>("")

    const parseOptions = (options: string[]) => {
        return options.map((option, index) => {
            return { value: snakeCase(option), label: option }
        })
    }

    const renderField = (field: Field) => {

        switch (field.type) {
            case InputTypes.TEXT:
            case InputTypes.EMAIL:
            case InputTypes.PASSWORD:
            case InputTypes.PHONE:
            case InputTypes.URL:
                return (
                    <TextInput 
                        label={field.label} 
                        required={field.required} 
                        placeholder={field.ui?.placeholder} 
                    />
                )
            case InputTypes.TEXTAREA:
                return (
                    <textarea 
                        title={field.label} 
                        minLength={field.validation?.minLength} 
                        maxLength={field.validation?.maxLength}
                        placeholder={field.ui?.placeholder}
                    />
                )
            case InputTypes.NUMBER:
                return (
                    <input 
                        title={field.label} 
                        type="number" 
                        min={field.validation?.minValue} 
                        max={field.validation?.maxValue}
                        placeholder={field.ui?.placeholder}
                    />
                )
            case InputTypes.DATE:
                return (
                    <input 
                        title={field.label} 
                        type="date" 
                        min={field.validation?.minValue} 
                        max={field.validation?.maxValue}
                    />
                )
            case InputTypes.DATETIME:
                return (
                    <input 
                        title={field.label} 
                        type="datetime-local" 
                        min={field.validation?.minValue} 
                        max={field.validation?.maxValue}
                    />
                )
            case InputTypes.SELECT:
                return (
                    <Select options={parseOptions(field.options??[])}></Select>
                )
            default:
                <></>
        }

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