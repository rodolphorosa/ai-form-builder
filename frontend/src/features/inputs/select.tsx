import { FC } from "react"
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
import { OptionsEditor } from "../form/option-editor"


export const SelectInput: FC<InputProps> = ({item, editable, onChange}) => {
    const options = item.options ?? []

    return (
        <div className="flex flex-col gap-1">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChange?.(["label"], value)}
            />
            {editable && (
                <OptionsEditor 
                    options={options} 
                    type="select" 
                    onAdd={(option) => {
                        onChange?.(["options"], [...options, option])
                    }}

                    onDelete={(option) => {
                        onChange?.(["options"], [...options.filter(op => op.value !== option.value)])
                    }}

                    onEdit={(option) => {
                        const optionIndex = options.findIndex(opt => opt.value == option.value)

                        onChange?.(
                            ["options", optionIndex],
                            option
                        )
                    }}

                    onSort={(sorted) => onChange?.(["options"], sorted)}
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