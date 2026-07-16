import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FormSchema, Item } from "@/src/types/form";
import { itemStates, operations, operationsNames } from "../registry";
import { Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";
import { LogicRule, Condition, ConditionGroup } from "@/src/types/logic";
import { State } from "@/src/types/inputs";

interface AdvancedTabProps {
    item: Item | null
    schema?: FormSchema
}

export const AdvancedTab = ({ item, schema }: AdvancedTabProps) => {
    let items: Item[] = []

    for (let section of schema?.sections ?? []) {
        items = items.concat(section.items)
    }

    items = items.filter(it => !(it.id === item?.id))

    let itemsOptions = items.map(it => {
        return { value: it.id, label: it.label }
    })

    itemsOptions = [
        // @ts-ignore
        { value: null, label: "Select an item"},
        ...itemsOptions
    ]

    let operatorOptions = Object.entries(operations).map(entry => {
        return { value: entry[1], label: operationsNames[entry[1]]}
    })

    operatorOptions = [
        // @ts-ignore
        { value: null, label: "Select an operation"},
        ...operatorOptions
    ]

    const [localRules, setLocalRules] = useState<LogicRule[]>([])

    const [editingRule, setEditingRule] = useState<LogicRule | null>(null)

    const logicRules: LogicRule[] = [
        {
            applyTo: "visible",
            condition: {
                operator: "and",
                conditions: [
                    {
                        item: "autor",
                        operator: "greater_than_or_equals",
                        value: 18
                    },
                    {
                        item: "autor",
                        operator: "equals",
                        value: "Ciência da Computação"
                    }
                ]
            }
        },
        {
            applyTo: "required",
            condition: {
                operator: "or",
                conditions: [
                    {
                        item: "autor",
                        operator: "equals",
                        value: true
                    },
                    {
                        item: "autor",
                        operator: "equals",
                        value: true
                    }
                ]
            }
        },
        // {
        //     applyTo: "disabled",
        //     condition: {
        //         operator: "or",
        //         conditions: [
        //             {
        //                 operator: "and",
        //                 conditions: [
        //                     {
        //                         item: "autor",
        //                         operator: "equals",
        //                         value: "Inactive"
        //                     },
        //                     {
        //                         item: "autor",
        //                         operator: "equals",
        //                         value: true
        //                     }
        //                 ]
        //             },
        //             {
        //                 item: "autor",
        //                 operator: "equals",
        //                 value: true
        //             }
        //         ]
        //     }
        // }
    ]

    const renderCondition = (condition: Condition) => {
        return (
            <div className="grid grid-cols-3 gap-0.5">
                <div className="flex flex-col gap-2">
                    <Select items={itemsOptions} defaultValue={null}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white w-full">
                            <SelectGroup>
                                <SelectLabel>Items</SelectLabel>
                                {itemsOptions?.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Select items={operatorOptions} defaultValue={null}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white w-full">
                            <SelectGroup>
                                <SelectLabel>Operations</SelectLabel>
                                {operatorOptions?.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Input type="text" min={0} value={condition.value as string} placeholder="Base value"/>
                </div>
            </div>
        )
    }

    const isConditionGroup = (
        value: Condition | ConditionGroup
    ): value is ConditionGroup => {
        return "conditions" in value
    }

    const renderConditionGroup = (group: ConditionGroup, applyTo?: string) => {
        const disabled = group.conditions.length == 0
        return (
            <Card>
                <CardHeader>
                    <div className="flex flex-row justify-start">
                        <ToggleGroup variant="outline" className="flex flex-row gap-0 border" defaultValue={["and"]}>
                            <ToggleGroupItem disabled={disabled} value="and" className="rounded-tr-none rounded-br-none">
                                and
                            </ToggleGroupItem>
                            <ToggleGroupItem disabled={disabled} value="or" className="rounded-tl-none rounded-bl-none">
                                or
                            </ToggleGroupItem>
                        </ToggleGroup>
                        
                    </div>
                </CardHeader>
                {
                    group.conditions.length == 0 ? 
                    (
                        <CardContent className="flex flex-col gap-3">
                            {renderCondition({
                                item: "",
                                operator: "",
                                value: ""
                            })}
                        </CardContent>
                    ):(
                        <CardContent className="flex flex-col gap-3">
                            {group.conditions.map((condition, index) => (
                                <div key={index}>
                                    {isConditionGroup(condition)
                                        ? renderConditionGroup(condition)
                                        : renderCondition(condition)}
                                </div>
                            ))}
                        </CardContent>
                    )
                }
            </Card>
        )
    }

    const createConditionText = (condition: Condition) => {
        const compareWith = items.find(it => it.id === condition.item)

        return (
            <>
                <span className="font-medium">
                    {compareWith?.label ?? "Unknown field"}
                </span>

                <span className="text-muted-foreground">
                    {" "}{operationsNames[condition.operator!]}{" "}
                </span>

                <span className="font-medium">
                    {String(condition.value)}
                </span>
            </>
        )
    }

    const createGroupText = (group: ConditionGroup): React.ReactNode => {
        return (
            <>
                {group.conditions.map((condition, index) => (
                    <React.Fragment key={index}>
                        {isConditionGroup(condition) ? (
                            <>
                                <span>(</span>
                                {createGroupText(condition)}
                                <span>)</span>
                            </>
                        ) : (
                            createConditionText(condition)
                        )}

                        {index < group.conditions.length - 1 && (
                            <span className="mx-1 font-semibold text-primary">
                                {group.operator.toUpperCase()}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </>
        )
    }

    const renderRules = (rules: LogicRule[]) => {
        return (
            <div className="flex flex-col gap-2">
                {rules.map(rule => {
                    return (
                        <div className="flex flex-col gap-2">
                            <div>{rule.applyTo}</div>
                            {renderConditionGroup(rule.condition)}
                            <div className="flex flex-row items-start gap-2 p-4 bg-primary/25 rounded-xl">
                                <Eye className="h-4 w-4 mt-0.5 text-primary" />
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm font-medium text-primary">
                                        Rule preview
                                    </div>
                                    <div>
                                        <span className="font-medium">{item?.label}{" "}</span>
                                        <span>{"is "}{rule.applyTo}</span>
                                        <span>{" "}when:{" "}</span>
                                        {createGroupText(rule.condition)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const addRule = (applyTo: "visible" | "required" | "disabled") => {
        const rule: LogicRule = {
            applyTo: applyTo,
            condition: {
                operator: "and",
                conditions: []
            }
        }

        setLocalRules(prev => [
            ...prev,
            rule
        ])

        setEditingRule(rule)
    }

    const addCondition = (applyTo: string | null) => {
        if (!applyTo) return
        
        const rule = localRules.find(it => it.applyTo === applyTo)

        if (!rule) return

        const condition: Condition = {
            item: null,
            operator: null,
            value: null
        }

        rule.condition.conditions.push(condition)

        setLocalRules(prev => [
            ...prev,

        ])

    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 px-3 py-2">
                <div className="text-sm font-medium">Rules</div>
                {/* {renderRules(logicRules)} */}
                {Object.entries(itemStates).map(entry => {
                    // const rules = logicRules.find(rule => rule.applyTo === entry[0])
                    const rules = (item?.logicRules ?? localRules)?.find(rule => rule.applyTo === entry[0])
                    return (
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-normal truncate">{entry[1]}</div>
                            {rules && renderConditionGroup(rules.condition, entry[0])}
                            {!rules && (
                                <div className="flex w-full p-8 border rounded-xl justify-center">
                                    <Button variant="ghost" onClick={() => addRule(entry[0] as State)}>
                                        <Plus />
                                        Create rule
                                    </Button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
