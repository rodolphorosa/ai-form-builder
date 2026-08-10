export interface AI {
    preferred_provider: string
    preferred_model: string
}

export interface Appearance {
    theme: "light" | "dark" | "system"
    language: "ptbr" | "en"
}

export interface UserSettings {
    ai: AI
    appearance: Appearance
}

export interface User {
    id: string
    name: string
    email: string
    createdAt: number
}