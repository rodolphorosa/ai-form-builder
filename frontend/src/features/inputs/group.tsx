import { FC } from "react"
import { InputProps } from "@/types/inputs"
import { Group, Item } from "@/types/form"
import { itemStrategies } from "../registry"

export const ItemGroup: FC<{group: Group}> = ({group}) => {
    const { id, label, description, items } = group

    console.log(group)

    return (
        <div>
            { items.map((it, index) => {
                const Component = itemStrategies[it.type]

                if(!Component) {
                    return (<div>Unsupported component.</div>)
                }
                
                return <Component item={it} /> 
            }) }
        </div>
    )
}
