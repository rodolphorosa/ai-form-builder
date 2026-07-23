import React, { FC } from "react"
import { EditableDescription, EditableLabel, InputLabel } from "./common"
import { Input } from "@/components/ui/input"
import { InputProps } from "@/types/inputs"
import { cn } from "@/lib/utils"

export const TextInput: FC<InputProps> = ({item, editable}) => {
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
                type={item.type}
                placeholder={item.ui?.placeholder}
                className={cn(
                    "border-0 border-b rounded-none p-0 shadow-none",
                    "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:border-b"
                )}
                readOnly={editable}
            />
        </div>
    )
}
