import { Astroid } from "lucide-react";
import CreateFormCard from "./create-form-card";
import { useTranslations } from "next-intl";
import CreateFormTrigger from "./create-form-trigger";

export default function CreateWithAi() {
    const i18nWorkspace = useTranslations("Workspace")

    return (
        <CreateFormTrigger
            role="link"
            href="/forms/new"
        >
            <CreateFormCard 
                icon={Astroid}
                title={i18nWorkspace("create with ai")}
                description={i18nWorkspace("create with ai / subtext")}
            />
        </CreateFormTrigger>
    )
}
