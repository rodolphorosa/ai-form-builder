"use client"

import React, {FC} from "react"
import { Field } from "../types/form"

interface SectionProps {
    label: string,
    fields: React.ReactNode
}

export const FormSection: FC<SectionProps> = ({label, fields}) => {
    return (
        <div className="rounded-lg border border-gray-200 p-4">
            <div className="text-left text-base font-semibold mb-4">{label}</div>
            {fields}
        </div>
    )
}