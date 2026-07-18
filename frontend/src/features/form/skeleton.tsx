import { Skeleton } from "@/components/ui/skeleton"

export const FormSkeleton = () => { 
    return (
        <div className="flex flex-col gap-4 p-1 min-h-0 h-full">
            <Skeleton className="h-8 w-100"/>
            <Skeleton className="h-6 w-50"/>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-8 w-full"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-8 w-full"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-8 w-full"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-8 w-full"/>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-12 w-full"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-50"/>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-8 w-full"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-8 w-full"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-8 w-full"/>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                        <Skeleton className="h-4 w-40"/>
                        <Skeleton className="h-12 w-full"/>
                    </div>
                </div>
            </div>
        </div>
    )
}