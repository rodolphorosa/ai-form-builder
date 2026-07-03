import { InputBaseProps } from "@/src/types/inputs";
import React, {FC} from "react"

interface TextProps extends InputBaseProps {
    placeholder?: string
}

export const TextInput: FC<TextProps> = ({ label, required, placeholder }) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1">
                <div>{label}</div>
                <div>{required? "*" : ""}</div>
            </div>
            <input 
                type="text"
                placeholder={placeholder}
                className="
                    w-full
                    h-10
                    px-3
                    border border-gray-300
                    rounded-md
                    text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-blue-500
                "
            />
        </div>
    )
}