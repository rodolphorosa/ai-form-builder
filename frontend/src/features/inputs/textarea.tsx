import React, { FC } from "react"
import { InputProps } from "@/types/inputs"
import { EditableDescription, EditableLabel, InputLabel } from "./common"
import { Textarea } from "@/components/ui/textarea"

export const TextareaInput: FC<InputProps> = ({item, editable}) => {
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
