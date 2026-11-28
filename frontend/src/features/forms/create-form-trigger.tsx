import { Link } from "@/i18n/navigation";
import { ComponentPropsWithRef, ReactNode } from "react";

interface BaseProps {
    children: ReactNode
}

type TriggerProps = BaseProps & (
    | {
        role: "link"
        href: string
    }
    | (Omit<ComponentPropsWithRef<"button">, "role" | "children"> & {
        role: "button"
        href?: never
    })
)

const triggerStyles = `
    flex 
    flex-row 
    p-3 
    gap-4 
    border 
    rounded-lg 
    shadow-sm 
    bg-card 
    items-center 
    h-fit 
    w-[240px] 
    cursor-pointer
    text-left
`

export default function CreateFormTrigger(props: TriggerProps) {
    if (props.role === "link") {
        return (
            <Link href={props.href} className={triggerStyles}>
                {props.children}
            </Link>
        )
    }

    const { role, children, className, ...buttonProps } = props

    return (
        <button 
            {...buttonProps}
            className={`${triggerStyles} ${className ?? ""}`}
            type="button"
        >
            {children}
        </button>
    )
}
