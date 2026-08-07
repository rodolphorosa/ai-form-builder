import { User } from "@/types/system"
import { ApiClient } from "./client"
import { ApiResponse } from "./types"

const api = new ApiClient()

export const userService = {
    login(email: string, password: string): Promise<ApiResponse<User>> {
        return api.post<ApiResponse<User>>("/users/login", { email: email, password: password })
    }
}