import React, {FC, useEffect, useState} from "react"
import { InputProps } from "@/types/inputs"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EditableLabel } from "./common"
import { Option } from "@/types/form"
import { OptionsEditor } from "../form/optionEditor"


export const SelectInput: FC<InputProps> = ({item, editable, onChange}) => {
    // const { options } = item
    const [options, setOptions] = useState<Option[]>(item.options ?? [])

    useEffect(() => {
        onChange?.(["options"], options)
    }, [options])

    return (
        <div className="flex flex-col gap-1">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChange?.(["label"], value)}
            />
            {editable && (
                // @ts-ignore
                <OptionsEditor 
                    options={options} 
                    type="select" 
                    onAdd={
                        (option) => setOptions(
                            prev => [...prev, option]
                        )
                    }
                    onDelete={
                        (option) => setOptions(
                            prev => [...prev.filter(op => op.value !== option.value)]
                        )
                    }
                    onEdit={
                        (option) => setOptions(
                            prev => [...prev.map(op => (
                                op.value == option.value ? option : op
                            ))]
                        )
                    }
                />
            )}
            {!editable && (
                <div className="w-full">
                    <Select items={options} disabled={editable}>
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
            )}
        </div>
    )
}