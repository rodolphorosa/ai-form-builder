import { Button } from "@/components/ui/button"
import { ArrowLeft, LockKeyhole } from "lucide-react"
import { useTranslations } from "next-intl"

export const FormAccessDenied = () => {
    const errors = useTranslations("Errors")
    return (
        <div className="flex h-screen w-screen bg-muted">
            <div className="flex flex-col min-w-[320px] max-w-[420px] px-8 py-16 gap-8 items-center m-auto bg-card rounded-xl shadow-xl">
                <div className="w-fit p-4 rounded-full bg-indigo-400/20 text-indigo-400">
                    <LockKeyhole className="h-8 w-8 shrink-0" />
                </div>
                <span className="text-center text-3xl font-semibold">
                    {errors("access denied")}
                </span>
                <span className="text-center text-muted-foreground">
                    {errors("permission to form denied")}
                </span>
                <span className="text-center text-sm text-muted-foreground">
                    {errors("contact form owner")}
                </span>
                <Button className="bg-indigo-400 text-indigo-100 hover:bg-indigo-400/50">
                    <ArrowLeft />
                    {errors("back to home")}
                </Button>
            </div>
        </div>
    )
}