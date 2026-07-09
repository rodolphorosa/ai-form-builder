import React, {FC} from "react"
import { LabelProps } from "@/src/types/inputs"
import { FieldDescription, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

export const InputLabel: FC<LabelProps> = ({label, description, required}) => {
    return (
        <>
            <FieldLabel>
                {label} <span className="text-destructive">{ required ? "*":""}</span>
            </FieldLabel>
            <FieldDescription>{description}</FieldDescription>
        </>
    )
}

export const Thinking = () => {
    return (
        <div className="sticky flex flex-row gap-2 self-end">
            <Spinner />
            <div>Thinking...</div>
        </div>
    )
}