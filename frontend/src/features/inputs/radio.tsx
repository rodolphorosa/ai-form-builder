import { FC } from "react"
import { InputProps } from "@/types/inputs"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Option } from "@/types/form"
import { EditableLabel } from "./common"
import { OptionsEditor } from "../form/optionEditor"


export const RadioInput: FC<InputProps> = ({ item, editable, onChange }) => {
    const options = item.options ?? []

    const parseOptions = (options: Option[]) => {
        return options.map((option, index) => {
            const id = `${item.id}-${index}`

            return (
                <div className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={id} />
                    <Label className="text-sm font-normal" htmlFor={id}>{option.label}</Label>
                </div>
            )
        })
    }

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
                    type="radio" 
                    onAdd={(option) => {
                        onChange?.(["options"], [...options, option])
                    }}

                    onDelete={(option) => {
                        onChange?.(["options"], [...options.filter(op => op.value !== option.value)])
                    }}

                    onEdit={(option) => {
                        onChange?.(
                            ["options"],
                            [...options.map(op => (op.value == option.value ? option : op))]
                        )
                    }}
                />
            )}
            {!editable && (
                <RadioGroup className="w-fit">
                    {parseOptions(item.options ?? [])}
                </RadioGroup>
            )}
        </div>
    )
}
