import { Skeleton } from "@/components/ui/skeleton"

export const FormSkeleton = () => { 
    return (
        <div className="flex flex-col gap-4 px-8 py-12 min-h-0 h-full bg-card border rounded-lg shadow-sm">
            <Skeleton className="h-8 w-100 mx-auto"/>
            <Skeleton className="h-6 w-50"/>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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