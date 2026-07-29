import { InputProps } from "@/types/inputs"
import React, { FC, useEffect, useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { EditableLabel, EditableText } from "./common"

import { Option } from "@/types/form"
import { OptionsEditor } from "../form/optionEditor"

export const CheckboxInput: FC<InputProps> = ({ item, editable, onChange }) => {
    const [options, setOptions] = useState<Option[]>(item.options ?? [])

    useEffect(() => {
        onChange?.(["options"], options)
    }, [options])

    return (
        <div className="flex flex-col gap-1 w-full">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChange?.(["label"], value)}
            />
            {!editable && (
                <div className="flex flex-col gap-1">
                    {options?.map((option: Option) => {
                        return (
                            <div className="flex flex-row gap-2 items-center text-sm">
                                <Checkbox className="h-4" id={option.value} name={option.value} disabled={editable} />
                                <EditableText text={option.label} placeholder="Nova opção" editable={editable}/>
                            </div>
                        )
                    })}
                </div>
            )}
            {editable && (
                <OptionsEditor 
                    options={options} 
                    type="checkbox" 
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
        </div>
    )
}