import { LucideIcon } from "lucide-react"

interface Props {
    icon: LucideIcon
    title: string
    description: string
}

export default function CreateFormCard({ 
    icon, 
    title, 
    description 
}: Props) {
    const IconComponent = icon as React.ComponentType<{ className?: string }>
    return (
        <>
            <span className="p-4 rounded-sm border bg-muted">
                <IconComponent />
            </span>
            
            <span className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                    {title}
                </span>
                
                <span className="text-xs font-normal text-muted-foreground">
                    {description}
                </span>
            </span>
        </>
    )
}
