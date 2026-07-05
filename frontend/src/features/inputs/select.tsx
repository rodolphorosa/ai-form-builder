import { InputProps } from "@/src/types/inputs"
import React, {FC} from "react"
import Select from "react-select"
import { snakeCase } from "lodash"
import { InputLabel } from "./common"

export const SelectInput: FC<InputProps> = ({field}) => {
    const label = field.label
    const required = field.required
    const options = field.options

    const parseOptions = (options: string[]) => { 
        return options.map((option, index) => {
            return { value: snakeCase(option), label: option }
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <InputLabel label={label} required={required} />
            <Select options={parseOptions(options??[])}/>
        </div>
    )
}
