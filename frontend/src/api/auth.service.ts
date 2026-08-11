import { User } from "@/types/system"
import { ApiClient } from "./client"
import { ApiResponse } from "./types"

const api = new ApiClient()

export const authService = {
    login(email: string, password: string): Promise<ApiResponse<User>> {
        return api.post<ApiResponse<User>>("/auth/login", { email: email, password: password })
    },

    logout(): Promise<{ message: string }> {
        return api.post<{ message: string }>("/auth/logout", {})
    },

    getMe(): Promise<ApiResponse<User>> {
        return api.get<ApiResponse<User>>("/auth/me")
    }
}