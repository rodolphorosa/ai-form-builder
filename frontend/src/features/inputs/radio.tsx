import React, {FC} from "react"
import { InputProps } from "@/types/inputs"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { EditableDescription, EditableLabel, InputLabel } from "./common"
import { Option } from "@/types/form"


export const RadioInput: FC<InputProps> = ({ item, editable }) => {
    const parseOptions = (options: Option[]) => {
        return options.map((option, index) => {
            const id = `${item.id}-${index}`

            return (
                <div className="flex items-center gap-3">
                    <RadioGroupItem value={option.value} id={id} />
                    <Label className="text-sm font-normal" htmlFor={id}>{option.label}</Label>
                </div>
            )
        })
    }

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
            <RadioGroup className="w-fit">
                {parseOptions(item.options ?? [])}
            </RadioGroup>
        </div>
    )
}
