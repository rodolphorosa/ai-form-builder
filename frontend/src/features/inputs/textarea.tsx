import React, {FC} from "react"
import { InputProps } from "@/types/inputs"
import { InputLabel } from "./common"
import { Field } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export const TextareaInput: FC<InputProps> = ({item: field}) => {
    const { label, required, description, validation, ui } = field

    return (
        <Field>
            <InputLabel label={label} description={description} required={required} />
            <Textarea 
                id="textarea-message" 
                placeholder={ui?.placeholder}
                minLength={validation?.minLength}
                maxLength={validation?.maxLength}
                className="resize-none"
            />
        </Field>
    )
}
