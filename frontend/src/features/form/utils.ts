import { Item, Section } from "@/types/form"

export const slugify = (text: string) =>
    text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^-+|-+$/g, "")

export type ItemsBySection = Record<string, Item[]>

export const sectionsToRecord = (sections: Section[]): ItemsBySection =>
    Object.fromEntries(sections.map((section) => [section.id, section.items]))

export const recordToSections = (sections: Section[], itemsBySection: ItemsBySection): Section[] =>
    sections.map((section) => ({
        ...section,
        items: itemsBySection[section.id] ?? section.items,
    }))

export const moveSortable = <T>(array: T[], from: number, to: number): T[] => {
    if (from === to) return array

    const copy = [...array]
    const removed = copy.splice(from, 1)[0]!
    copy.splice(to, 0, removed)

    return copy
}

export const isSystemGeneratedName = (name: string) => {
    return /^(?:field|section|option)_[a-z0-9]+$/.test(name)
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
    )
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
}

export const downloadJson = (data: unknown, filename: string) => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], {
        type: "application/json",
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)
}