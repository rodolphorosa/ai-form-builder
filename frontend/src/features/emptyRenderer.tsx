import * as React from "react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { FilePlusCorner } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyRendererProps {
    onCreate: () => void
}

export const EmptyRenderer = ({onCreate}: EmptyRendererProps) => {

    return (
        <Empty className="h-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FilePlusCorner />
                </EmptyMedia>
                <EmptyTitle>No form created yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any form schema yet.
                    <br />
                    Get started by describing the form you want and AI will create it for you.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <Button onClick={onCreate}>Create Form</Button>
                <Button variant="outline">Import Schema</Button>
            </EmptyContent>
        </Empty>
    )
}
