import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Form, Project } from "@/types/form"
import { useTranslations } from "next-intl"

function DeleteForm ({ 
    form, 
    open, 
    onOpenChange, 
    onDelete 
}: {
    form: Form
    open: boolean
    onOpenChange: (open: boolean) => void
    onDelete: (form: Form) => void
}) {
    const i18nCommon = useTranslations("Common")
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="text-lg">
                    Excluir formulário?
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className="text-base">
                        <span>Tem certeza que deseja excluir{" "}</span>
                        <span className="font-semibold">{form.name}</span>
                        <span>?</span>
                    </div>
                    <span className="text-muted-foreground">
                        O projeto poderá ser restaurado a qualquer momento durante os próximos 30 dias. Após esse período, ele será removido automaticamente.
                    </span>
                </div>
                <DialogFooter className="bg-transparent border-t-0">
                    <DialogClose 
                        render={
                            <Button variant="ghost">
                                {i18nCommon("cancel")}
                            </Button>
                        } 
                    />
                    <Button 
                        variant="destructive"
                        onClick={(e) => {
                            e.preventDefault()
                            onDelete(form)
                        }}
                    >
                        {i18nCommon("delete")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteForm