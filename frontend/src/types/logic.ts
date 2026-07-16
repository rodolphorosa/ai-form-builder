import { operations } from "../features/registry"

export type OperationType = typeof operations[keyof typeof operations]

export const LogicalOperator = {
    AND: "and",
    OR: "or"
} as const

export type LogicalOperator = typeof LogicalOperator[keyof typeof LogicalOperator]

export interface Condition {
    item: string | null
    operator: OperationType | null
    value: number | string | boolean | null
}

export interface ConditionGroup {
    operator: LogicalOperator
    // conditions: Array<Condition | ConditionGroup>
    conditions: Condition[]
}

export interface LogicRule {
    applyTo: "visible" | "required" | "disabled"
    condition: ConditionGroup
}