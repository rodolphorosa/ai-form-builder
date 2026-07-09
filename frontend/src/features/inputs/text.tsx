import React, {FC} from "react"
import { InputProps } from "@/src/types/inputs"
import { InputLabel } from "./common"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const TextInput: FC<InputProps> = ({item: field}) => {
    const { id, label, type, description, required, ui } = field

    return (
        <div className="flex flex-col gap-1">
            <Field>
                <InputLabel label={label} description={description} required={required}/>
                <Input
                    id={id}
                    type={type}
                    placeholder={ui?.placeholder}
                    required={required}
                />
            </Field>
        </div>
    )
}
