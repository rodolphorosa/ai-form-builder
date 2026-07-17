import { FormSchema, InputTypes, Item, SectionItem } from "@/src/types/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { strategyIcons, typesNames } from "../registry"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Brain, Check, CircleCheckBig, Code, Option, Settings2 } from "lucide-react"
import { PropertiesTab } from "./props"
import { AdvancedTab } from "./logic"
import { ValidationMenu } from "./validation"
import { OptionsTab } from "./options"

interface EditMenuProps {
    schema: FormSchema
    item: Item
    open: boolean
    setOpen: (open: boolean) => void
}

export const EditMenu = ({ schema, item, open, setOpen }: EditMenuProps) => {
    
    const renderTypeIcon = (item: Item) => {
        const Icon = strategyIcons[item.type] as React.ComponentType<{className?: string}> | undefined

        if(!Icon) return <></>

        return <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
    }

    const isOptionType = (item: Item) => 
        item?.type === InputTypes.SELECT || item?.type === InputTypes.RADIO
    
    return (
        <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
            <DrawerContent className="w-[40%] max-h-screen">
                <div className="flex h-full min-h-0 flex-col border-l py-2">
                    <div className="flex flex-row gap-2 p-4">
                        {item && renderTypeIcon(item)}
                        <div className="text-sm font-medium">{item && typesNames[item.type]}</div>
                    </div>
                    <Separator />
                    <div className="relative flex flex-col p-4 overflow-y-auto">
                        <Tabs defaultValue="props">
                            <TabsList className="w-full">
                                <TabsTrigger value="props">
                                    <Settings2 />
                                    <div className="text-sm font-medium truncate">
                                        Properties
                                    </div>
                                </TabsTrigger>
                                {isOptionType(item) && (
                                    <TabsTrigger value="options">
                                        <Option />
                                        <div className="text-sm font-medium truncate">
                                            Options
                                        </div>
                                    </TabsTrigger>
                                )}
                                <TabsTrigger value="validation">
                                    <CircleCheckBig />
                                    <div className="text-sm font-medium truncate">
                                        Validation
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="logic">
                                    <Brain />
                                    <div className="text-sm font-medium truncate">
                                        Logic
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="props">
                                <PropertiesTab item={item} schema={schema}/>
                            </TabsContent>
                            <TabsContent value="options">
                                <OptionsTab item={item} schema={schema} />
                            </TabsContent>
                            <TabsContent value="validation">
                                <ValidationMenu item={item} schema={schema} />
                            </TabsContent>
                            <TabsContent value="logic">
                                <AdvancedTab item={item} schema={schema}/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
