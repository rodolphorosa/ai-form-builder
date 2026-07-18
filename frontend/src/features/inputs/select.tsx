import React, {FC} from "react"
import { InputProps } from "@/types/inputs"
import { snakeCase } from "lodash"
import { InputLabel } from "./common"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field } from "@/components/ui/field"

export const SelectInput: FC<InputProps> = ({item: field}) => {
    const { label, description, required, options } = field

    const parseOptions = (options: string[]) => { 
        return options.map((option, index) => {
            return { value: snakeCase(option), label: option }
        })
    }

    return (
        <Field>
            <InputLabel label={label} description={description} required={required} />
            <Select items={options}>
                <SelectTrigger className="w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                        {options?.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                            {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
}
