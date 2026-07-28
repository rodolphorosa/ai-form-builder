import { InputProps } from "@/types/inputs"
import React, { FC } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { EditableLabel } from "./common"

export const CheckboxInput: FC<InputProps> = ({ item, editable, onChange }) => {
    return (
        <div className="flex gap-3 items-center w-full">
            <Checkbox id={item.id} name={item.id} disabled={item.disabled} />
            <EditableLabel label={item.label} required={item.required} editable={editable} onChange={onChange}/>
        </div>
    )
}