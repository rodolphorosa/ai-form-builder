import React, { FC } from "react"
import { InputProps } from "@/types/inputs"
import { Textarea } from "@/components/ui/textarea"
import { EditableLabel } from "./common"

export const TextareaInput: FC<InputProps> = ({item, editable, onChange}) => {
    return (
        <div className="flex flex-col gap-1">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChange?.(["label"], value)}
            />
            <Textarea 
                id="textarea-message"
                placeholder={item.ui?.placeholder}
                minLength={item.validation?.minLength}
                maxLength={item.validation?.maxLength}
                className="!min-h-8 h-8 resize-none border-0 border-b rounded-none p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:border-b"
                readOnly={editable}
            />
        </div>
    )
}
