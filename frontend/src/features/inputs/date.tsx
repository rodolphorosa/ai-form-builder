"use client"

import React, {FC} from "react"
import { InputProps } from "@/types/inputs"

import { EditableDescription, EditableLabel, InputLabel } from "./common"
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const DateInput: FC<InputProps> = ({item, editable}) => {
    const [date, setDate] = React.useState<Date>()
    
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
            <Popover>
                <PopoverTrigger 
                    render={
                        <Button 
                            variant={"outline"} 
                            data-empty={!date} 
                            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                            disabled={editable}
                        >
                                <CalendarIcon />
                        </Button>
                    } />
                <PopoverContent className="w-fit p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
