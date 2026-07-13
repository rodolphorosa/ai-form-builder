"use client"

import React, {FC} from "react"
import { InputProps } from "@/src/types/inputs"

import { InputLabel } from "./common"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Field } from "@/components/ui/field"

export const DateInput: FC<InputProps> = ({item: item}) => {
    const label = item.label
    const required = item.required
    const description = item.description

    const [date, setDate] = React.useState<Date>()
    
    return (
        <div>
            <Popover>
                <PopoverTrigger 
                    render={
                        <div className="flex flex-col gap-2">
                            <InputLabel label={label} description={description} required={required} />
                            <Button 
                                variant={"outline"} 
                                data-empty={!date} 
                                className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground">
                                    {date ? format(date, "PPP") : label}<ChevronDownIcon data-icon="inline-end" />
                            </Button>
                        </div>
                    } />
                <PopoverContent className="w-auto p-0" align="start">
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

