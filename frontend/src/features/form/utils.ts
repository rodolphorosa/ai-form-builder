import { Item, Section } from "@/types/form"

export const slugify = (text: string) =>
    text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
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
