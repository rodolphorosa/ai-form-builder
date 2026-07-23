import React, {FC} from "react"
import { InputProps } from "@/types/inputs"
import { snakeCase } from "lodash"
import { EditableDescription, EditableLabel, InputLabel } from "./common"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const SelectInput: FC<InputProps> = ({item, editable}) => {
    const { label, description, required, options } = item

    const parseOptions = (options: string[]) => { 
        return options.map((option, index) => {
            return { value: snakeCase(option), label: option }
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <div>
                {!editable && (
                    <InputLabel 
                        label={item.label} 
                        description={item.description}
                        required={item.required}/>
                )}
                {editable && (
                    <div className="flex flex-col gap-1">
                        <EditableLabel item={item} onBlur={(value) => console.log(value)} />
                        <EditableDescription item={item} onBlur={(value) => console.log(value)} />
                    </div>
                )}
            </div>
            <div className="w-full">
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
            </div>
            
        </div>
    )
}
