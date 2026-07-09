import React, { FC } from "react"
import { FormSchema, Group, Section, SectionItem } from "../types/form"
import { ItemGroup } from "./inputs/group"
import { itemStrategies } from "./registry"

interface RendererProps {
    schema: FormSchema

}

export const Renderer: FC<RendererProps> = ({schema}) => {

    const isGroup = (item: SectionItem): item is Group => {
        return "items" in item
    }

    const renderSectionItem = (item: SectionItem) => {

        if(isGroup(item)) {
            return (
                <ItemGroup group={item} />
            )
        }

        const Component = itemStrategies[item.type]

        if(!Component) {
            return (<div>Unsupported input type</div>)
        }

        return <Component item={item} />

    }

    const renderSection = (section: Section) => {
        return (
            <div className="flex flex-col gap-4">
                <div className="text-left text-base font-semibold">{section.label}</div>
                <div className="grid grid-cols-2 gap-3">
                    { section.items.map(field => renderSectionItem(field)) }
                </div>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-4 overflow-auto">
            <div className="text-center text-lg font-semibold">{schema.title}</div>
            <div className="flex flex-col gap-5">
                { schema.sections.map(section => renderSection(section)) }
            </div>
        </div>
    )
}
