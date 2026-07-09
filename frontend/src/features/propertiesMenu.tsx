import React, { FC } from "react"
import { Group, Item, SectionItem } from "../types/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { strategyIcons, typesNames } from "./registry"

interface PropertiesMenuProps {
    item: SectionItem | null
    
}

export const PropertiesMenu: FC<PropertiesMenuProps> = ({ item }) => {

    const isGroup = (item: SectionItem): item is Group => {
        return "items" in item
    }

    const renderTypeIcon = (item: SectionItem) => {
        const Icon = strategyIcons[item.type]

        if(!Icon) return <></>

        return <Icon />
    }


    return (
        <div className="flex flex-col border-l">
            <div className="flex flex-row gap-2 p-4">
                {item && renderTypeIcon(item)}
                <div className="text-base font-normal">{item && typesNames[item.type]}</div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4 px-4 py-2">
                <div>
                    <div>Name</div>
                    <Input type="text" defaultValue={item?.label}/>
                </div>
                
                <div>
                    <div>Placeholder</div>
                    <Input type="text" defaultValue={item?.ui?.placeholder}/>
                </div>
                <div>
                    <div>Description</div>
                    <Input type="text" defaultValue={item?.description}/>
                </div>
                {item && !isGroup(item) && (
                    <>
                        <div className="flex flex-row justify-between">
                            <div>Required</div>
                            <Switch id="item-required" checked={item.required} />
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>Disabled</div>
                            <Switch id="item-disabled" checked={item.disabled} />
                        </div>
                    </>
                )}
            </div>
            <Separator />
            <div className="flex flex-col gap-4 px-4 py-2">
                <div className="text-base font-semibold">Validation</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div>Minimum value</div>
                        <Input type="number" defaultValue={(item as Item).validation?.minValue} />
                    </div>
                    <div>
                        <div>Maximum value</div>
                        <Input type="number" defaultValue={(item as Item).validation?.maxValue} />
                    </div>
                    <div>
                        <div>Minimum length</div>
                        <Input type="number" defaultValue={(item as Item).validation?.minLength} />
                    </div>
                    <div>
                        <div>Maximum length</div>
                        <Input type="number" defaultValue={(item as Item).validation?.maxLength} />
                    </div>
                </div>
                
            </div>
            <Separator />
            <div className="flex flex-col gap-4 px-4 py-2">
                <div className="text-base font-semibold">UI</div>
                <div>
                    <div>Help text</div>
                    <Input type="text" defaultValue={item?.ui?.helpText}/>
                </div>
            </div>
        </div>
    )
}
