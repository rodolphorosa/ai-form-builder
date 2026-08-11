import { User } from "@/types/system"
import { ApiClient } from "./client"
import { ApiResponse } from "./types"

const api = new ApiClient()

interface UserRequest {
    name: string,
    email: string,
    password: string
}

export const userService = {
    create(request: UserRequest): Promise<ApiResponse<User>> {
        return api.post<ApiResponse<User>>("/users", request)
    }
}