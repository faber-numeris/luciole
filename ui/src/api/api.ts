type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions extends RequestInit {
    method?: HttpMethod;
    body?: any;
}

async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers, ...rest } = options;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        method,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
        ...rest,
    };

    if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return {} as T;
}

export const api = {
    get: <T>(url: string, options?: Omit<RequestOptions, 'method'>) =>
        apiRequest<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>) =>
        apiRequest<T>(url, { ...options, method: 'POST', body }),
    put: <T>(url: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>) =>
        apiRequest<T>(url, { ...options, method: 'PUT', body }),
    delete: <T>(url: string, options?: Omit<RequestOptions, 'method'>) =>
        apiRequest<T>(url, { ...options, method: 'DELETE' }),
};
