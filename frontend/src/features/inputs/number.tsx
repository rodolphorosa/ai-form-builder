import React, {FC} from "react"
import { InputProps } from "@/types/inputs"
import { Input } from "@/components/ui/input"
import { EditableLabel } from "./common"

export const NumberInput: FC<InputProps> = ({item, editable, onChange}) => {
    return (
        <div className="flex flex-col gap-1">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChange?.(["label"], value)}
            />
            <Input
                id={item.id}
                type="number"
                placeholder={item.ui?.placeholder}
                min={item.validation?.minValue}
                max={item.validation?.maxValue}
                className="
                    [appearance:textfield]
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none
                    border-0 border-b rounded-none p-0 shadow-none
                    focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:border-b
                "
            />
        </div>
    )
}
