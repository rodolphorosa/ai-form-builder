const API_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiClient {
    private readonly headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }

    private readonly options: RequestInit = { credentials: "include", }
    
    async post<T>(url: string, body: unknown): Promise<T> {
        
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
        if (!response.ok) {
            const error = await response.text()
            throw new Error("Request failed " + error)
        }

        return response.json() as Promise<T>
    }
}
