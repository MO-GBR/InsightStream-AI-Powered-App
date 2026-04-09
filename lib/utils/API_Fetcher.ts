export const apiFetcher = async (
    url: string,
    options: RequestInit = {}
) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
};

export const apiFetcherWithRetries = async (
    url: string,
    options: RequestInit = {},
    retries: number = 3,
    retryDelay: number = 1000
) => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await apiFetcher(url, options);
        } catch (error) {
            if (attempt < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
                throw error;
            }
        }
    }
};