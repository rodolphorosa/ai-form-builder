const API_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly code?: string
    ) {
        super(message)
        this.name = "ApiError"
    }
}

export class ApiClient {
    private readonly headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }

    private readonly options: RequestInit = { credentials: "include", }
    
    async post<T>(url: string, body?: unknown): Promise<T> {
        
        const response = await fetch(`${API_URL}${url}`, {
            ...this.options,
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })

        return this.handleResponse<T>(response)
    }

    async postFormData<T>(url: string, body: FormData): Promise<T> {
        const response = await fetch(`${API_URL}${url}`, {
            ...this.options,
            method: "POST",
            body
        })

        return this.handleResponse<T>(response)
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(`${API_URL}${url}`, {
            ...this.options,
            method: "GET",
            headers: this.headers
        })

        return this.handleResponse<T>(response)
    }

    async patch<T>(url: string, patch: unknown): Promise<T> {
        const response = await fetch(`${API_URL}${url}`, {
            ...this.options,
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(patch)
        })

        return this.handleResponse<T>(response)
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json()

        if (!response.ok) {
            throw new ApiError(
                data.detail?.message ?? "An unexpected error occurred",
                response.status,
                data.detail?.code
            )
        }

        return data as T
    }
}
