import React, {FC} from "react"
import { InputProps } from "@/src/types/inputs"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field } from "@/components/ui/field"
import { InputLabel } from "./common"
import { Option } from "@/src/types/form"


export const RadioInput: FC<InputProps> = ({ item: field }) => {
    const { label, description, required, options } = field

    const parseOptions = (options: Option[]) => {
        return options.map((option, index) => {
            const id = `${field.id}-${index}`

            return (
                <div className="flex items-center gap-3">
                    <RadioGroupItem value={option.value} id={id} />
                    <Label htmlFor={id}>{option.label}</Label>
                </div>
            )
        })
    }

    return (
        <Field>
            <InputLabel label={label} description={description} required={required}/>
            <RadioGroup className="w-fit">
                {parseOptions(options ?? [])}
            </RadioGroup>
        </Field>
    )
}
