import React, {FC} from "react"
import { InputProps } from "@/types/inputs"
import { snakeCase } from "lodash"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EditableLabel } from "./common"

export const SelectInput: FC<InputProps> = ({item, editable, onChange}) => {
    const { label, description, required, options } = item

    const parseOptions = (options: string[]) => { 
        return options.map((option, index) => {
            return { value: snakeCase(option), label: option }
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <EditableLabel label={item.label} required={item.required} editable={editable} onChange={onChange}/>
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
