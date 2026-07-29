"use client"

import React, {FC} from "react"
import { InputProps } from "@/types/inputs"

import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { EditableLabel } from "./common"

export const DateInput: FC<InputProps> = ({item, editable, onChange}) => {
    const [date, setDate] = React.useState<Date>()
    
    return (
        <div className="flex flex-col gap-1">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChange?.(["label"], value)}
            />
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
