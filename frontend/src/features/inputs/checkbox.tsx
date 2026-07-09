import { InputProps } from "@/src/types/inputs"
import React, { FC } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

export const CheckboxInput: FC<InputProps> = ({ item: field }) => {
    const { id, label, disabled, required, ui, options } = field

    return (
        <Field orientation="horizontal" data-disabled>
            <Checkbox id={id} name={id} disabled={disabled} />
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
        </Field>
    )
}