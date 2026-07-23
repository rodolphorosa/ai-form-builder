import { InputProps } from "@/types/inputs"
import React, { FC } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { EditableLabel, InputLabel } from "./common"

export const CheckboxInput: FC<InputProps> = ({ item, editable }) => {
    return (
        <div className="flex gap-3 items-center w-full">
            <Checkbox id={item.id} name={item.id} disabled={item.disabled} />
            <>
                {!editable && (
                    <InputLabel 
                        label={item.label} 
                        required={item.required}/>
                )}
                {editable && (
                    <EditableLabel item={item} onBlur={(value) => console.log(value)} />
                )}
            </>
        </div>
    )
}