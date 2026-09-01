"use client"

import { cn } from "@/lib/utils"
import { EditableLabel } from "./common"
import { InputProps } from "@/types/inputs"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countries } from "../registry"
import { Option } from "@/types/form"

import * as Flags from "country-flag-icons/react/3x2"
import { Input } from "@/components/ui/input"
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger } from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type CountryFlagProps = {
  code: string
}

export function CountryFlag({ code }: CountryFlagProps) {
  const Flag = Flags[code.toUpperCase() as keyof typeof Flags]

  if (!Flag) return null

  return <Flag />
}

function PhoneInput ({
    item, 
    editable, 
    onChange, 
    onChangeLabel
}: InputProps) {

    const [selectedCountry, setSelectedCountry] = useState<string | null>()

    const options = countries.map(country => (
        { value: country.code, label: country.name, dialCode: country.dialCode }
    ))

    return (
        <div className="flex flex-col gap-1">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChangeLabel?.(value)}
            />
            <div className="flex flex-row gap-0.5">
                <div className="w-fit">
                    <Combobox 
                        items={options}
                        onValueChange={setSelectedCountry}
                    >
                        <ComboboxTrigger 
                            render={
                                <Button 
                                    size="icon" 
                                    variant="outline"
                                    className="bg-transparent border-0 border-b rounded-none"
                                >
                                    {selectedCountry && <CountryFlag code={selectedCountry} />}
                                </Button>
                            }
                        />
                        <ComboboxContent side="bottom" className="w-full p-1">
                            <ComboboxInput showTrigger={false} placeholder="Search" />
                            <ComboboxList className="m-t-1">
                                {(item) => {
                                    
                                    return (
                                        <ComboboxItem key={item.value} value={item.value}>
                                            <CountryFlag code={item.value} />
                                            <span className="flex-1">{item.label}</span>
                                            <span className="text-muted-foreground text-sm">
                                                {item.dialCode}
                                            </span>
                                        </ComboboxItem>
                                    )
                                }}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
                <Input
                    id={item.id}
                    type="phone"
                    placeholder={item.ui?.placeholder}
                    className={cn(
                        "border-0 border-b rounded-none p-0 shadow-none",
                        "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:border-b"
                    )}
                    readOnly={editable}
                />
            </div>
        </div>
    )
}

export default PhoneInput