"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormUpdateParams } from "@/types/form"
import { useState } from "react"

export const RenameForm = ({ 
    form, 
    open,
    onSave,
    onCancel,
    onOpenChange
}: { 
    form: Form
    open: boolean 
    onSave: (updateParams: FormUpdateParams) => void
    onCancel: () => void
    onOpenChange: (open: boolean) => void
}) => {
    const [name, setName] = useState<string>("")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="font-medium">
                    Rename form
                </DialogHeader>
                <Input 
                    type="text"
                    placeholder={form?.name}
                    onChange={(e) => setName(e.target.value ?? "")}
                />
                <DialogFooter className="bg-transparent border-t-0">
                    <DialogClose render={<Button variant="ghost">Cancel</Button>} />
                    <Button
                        variant="outline"
                        onClick={(e) => {
                            e.preventDefault()
                            onSave({
                                form: form,
                                attribute: "name",
                                value: name
                            })
                        }}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}