"use client"

import React, {FC} from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { InputProps } from "@/types/inputs"
import { Calendar as CalendarIcon } from "lucide-react"
import { EditableLabel } from "./common"

export const DatetimeInput: FC<InputProps> = ({item, editable, onChange}) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col gap-1">
      <EditableLabel 
          label={item.label} 
          required={item.required} 
          editable={editable} 
          onChange={(value) => onChange?.(["label"], value)}
      />
      <div className="w-full flex flex-row gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger 
            render={
                <Button 
                    variant="outline" 
                    id="date-picker-optional" 
                    className="w-[212px] justify-between font-normal"
                    disabled={editable}
                  >
                      <CalendarIcon data-icon="inline-end"/>
                </Button>
            } />
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          className="w-[100px] appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
    
  )
}
