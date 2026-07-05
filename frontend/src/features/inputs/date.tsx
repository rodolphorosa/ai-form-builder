import { InputProps } from "@/src/types/inputs"
import React, {FC} from "react"
import { InputLabel } from "./common"

export const DateInput: FC<InputProps> = ({field}) => {
    const label = field.label
    const required = field.required
    const minValue = field.validation?.minValue
    const maxValue = field.validation?.maxValue
    
    return (
        <div className="flex flex-col gap-1">
            <InputLabel label={label} required={required} />
            <input 
                type="date"
                min={minValue}
                max={maxValue}
                className="
                    w-full
                    h-10
                    px-3
                    border border-gray-300
                    rounded-md
                    text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-blue-500
                "
            />
        </div>
    )
}
