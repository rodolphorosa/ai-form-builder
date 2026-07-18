import React, {FC} from "react"
import { InputProps } from "@/types/inputs"
import { InputLabel } from "./common"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const NumberInput: FC<InputProps> = ({item: field}) => {
    const { id, label, required, description, validation } = field

    return (
        <div className="flex flex-col gap-1">
            <Field>
                <InputLabel label={label} description={description} required={required}/>
                <Input
                    id={id}
                    type="number"
                    required={required}
                    min={validation?.minValue}
                    max={validation?.maxValue}
                />
            </Field>
        </div>
    )
}
