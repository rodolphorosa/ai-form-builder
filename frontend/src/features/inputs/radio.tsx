import React, {FC} from "react"
import { InputProps } from "@/types/inputs"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Option } from "@/types/form"
import { EditableLabel } from "./common"


export const RadioInput: FC<InputProps> = ({ item, editable, onChange }) => {
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
            <EditableLabel label={item.label} required={item.required} editable={editable} onChange={onChange}/>
            <RadioGroup className="w-fit">
                {parseOptions(item.options ?? [])}
            </RadioGroup>
        </div>
    )
}
