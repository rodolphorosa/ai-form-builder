export class ApiClient {
    private readonly headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
    
    async post<T>(url: string, body: unknown): Promise<T> {
        
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })

        return this.handleResponse<T>(response)
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: "GET",
            headers: this.headers
        })

        return this.handleResponse<T>(response)
    }

    async patch<T>(url: string, patch: unknown): Promise<T> {
        const response = await fetch(url, {
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
