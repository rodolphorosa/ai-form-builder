import React, {FC} from "react"
import { InputProps } from "@/types/inputs"
import { EditableDescription, EditableLabel, InputLabel } from "./common"
import { Input } from "@/components/ui/input"

export const NumberInput: FC<InputProps> = ({item, editable}) => {
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
