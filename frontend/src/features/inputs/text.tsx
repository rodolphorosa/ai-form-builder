import React, { FC } from "react"
import { EditableLabel } from "./common"
import { Input } from "@/components/ui/input"
import { InputProps } from "@/types/inputs"
import { cn } from "@/lib/utils"

export const TextInput: FC<InputProps> = ({item, editable, onChange}) => {
    return (
        <div className="flex flex-col gap-2">
            <EditableLabel label={item.label} required={item.required} editable={editable} onChange={onChange}/>
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
