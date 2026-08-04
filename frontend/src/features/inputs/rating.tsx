import { InputProps } from "@/types/inputs";
import { FC, useState } from "react";
import { EditableLabel } from "./common";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const RatingInput: FC<InputProps> = ({ item, editable, onChange }) => {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    return (
        <div className="flex flex-col gap-1 w-full">
            <EditableLabel 
                label={item.label} 
                required={item.required} 
                editable={editable} 
                onChange={(value) => onChange?.(["label"], value)} 
            />
            {!editable && (
                <div
                    className="flex flex-row gap-2 items-center text-sm"
                    onMouseLeave={() => setHoverRating(0)}
                >
                    {Array.from({ length: 5 }).map((_, index) => {
                        const value = index + 1
                        const active = (hoverRating || rating) >= value

                        return (
                            <Star
                                key={value}
                                className={cn(
                                    "w-4 h-4 shrink-0 cursor-pointer transition-colors",
                                    active && "text-yellow-500"
                                )}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoverRating(value)}
                            />
                        )
                    })}
                </div>
            )}
            {editable && (
                <div
                    className="flex flex-row gap-2 items-center text-sm"
                >
                    {Array.from({ length: 5 }).map((_, index) => {
                        const value = index + 1
                        return (
                            <Star
                                key={value}
                                className="w-4 h-4 shrink-0 cursor-pointer"
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}