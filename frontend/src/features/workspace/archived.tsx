import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppContentWrapper from "../common/app-content-wrapper";
import ArchivedForms from "./archived-forms";
import ArchivedProjects from "./archived-projects";
import { FileText, FolderClosed, Form as FormIcon, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function Archived () {
    const i18nCommon = useTranslations("Common")

    return (
        <AppContentWrapper>
            <div className="w-[1072px] h-fit flex flex-col p-8 gap-8 mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-2xl font-normal">
                        {i18nCommon("archived")}
                    </div>
                    <InputGroup className="max-w-xs">
                        <InputGroupInput 
                            type="text"
                            placeholder={i18nCommon("search archived")}
                        />
                        <InputGroupAddon align="inline-start">
                            <Search className="h-4 w-4 shrink-0" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <Tabs defaultValue="projects">
                    <TabsList>
                        <TabsTrigger value="projects">
                            <FolderClosed className="h-4 w-4 shrink-0" />
                            {i18nCommon("projects")}
                        </TabsTrigger>
                        <TabsTrigger value="forms">
                            <FormIcon className="h-4 w-4 shrink-0" />
                            {i18nCommon("forms")}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="projects">
                        <ArchivedProjects />
                    </TabsContent>
                    <TabsContent value="forms">
                        <ArchivedForms />
                    </TabsContent>
                </Tabs>
            </div>
        </AppContentWrapper>
    )
}