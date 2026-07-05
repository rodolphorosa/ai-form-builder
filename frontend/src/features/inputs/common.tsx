import React, {FC} from "react"
import { LabelProps } from "@/src/types/inputs"

export const InputLabel: FC<LabelProps> = ({label, required}) => {
    return (
        <div className="flex gap-1">
            <div>{label}</div>
            <div style={{ color: "red" }}>{required? "*" : ""}</div>
        </div>
    )
}