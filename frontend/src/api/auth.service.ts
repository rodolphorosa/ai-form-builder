import { User } from "@/types/system"
import { ApiClient } from "./client"
import { ApiResponse } from "./types"

const api = new ApiClient()

export const authService = {
    login(email: string, password: string): Promise<ApiResponse<User>> {
        return api.post<ApiResponse<User>>("/auth/login", { email: email, password: password })
    },

    getMe(): Promise<User> {
        return api.get<User>("/auth/me")
    }
}