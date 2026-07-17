import { Input } from "@/components/ui/input";
import { formService } from "@/src/api/form";
import { Change, Suggestion } from "@/src/types/ai";
import { FormSchema, Item } from "@/src/types/form";
import { useEffect, useState } from "react";
import { SuggestionCard } from "./suggestions/card";
import { Suggestions } from "./suggestions/suggestions";

interface ValidationMenuProps {
    item: Item | null
    schema?: FormSchema | null
}

export const ValidationMenu = ({ item , schema}: ValidationMenuProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 px-4 py-2">
                <div className="text-sm font-medium">Validation</div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-normal">Mininum value</div>
                        <Input type="number" min={0} value={item?.validation?.minValue}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-normal">Maximum value</div>
                        <Input type="number" min={0} value={item?.validation?.minValue}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-normal">Mininum length</div>
                        <Input type="number" min={0} value={item?.validation?.minValue}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-normal">Maximum length</div>
                        <Input type="number" min={0} value={item?.validation?.minValue}/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-normal">
                        Regex
                    </div>
                    <Input type="text" placeholder="Ex.: ^\d{3}\.\d{3}\.\d{3}-\d{2}$" value={item?.validation?.regex} />
                </div>
                { (item && schema) && <Suggestions item={item} schema={schema} context="validation" />}
            </div>
        </div>
    )
}
