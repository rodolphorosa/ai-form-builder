export class ApiClient {
    private readonly headers = { 
        'Content-Type': 'application/json' 
    }
    
    async post<T>(url: string, body: unknown): Promise<T> {
        
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })

        if(!response.ok) {
            const error = await response.text()
            throw new Error("Request failed " + error)
        }

        return response.json() as Promise<T>
    }
}
