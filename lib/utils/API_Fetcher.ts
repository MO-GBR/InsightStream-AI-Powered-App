const resolveApiUrl = (path: string) => {
    if (typeof window !== "undefined") {
        return path;
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL
        ?? process.env.NEXTAUTH_URL
        ?? process.env.VERCEL_URL;

    if (!appUrl) {
        return `http://localhost:3000${path}`;
    }

    const origin = appUrl.startsWith("http") ? appUrl : `https://${appUrl}`;
    return `${origin}${path}`;
};

export const apiFetcher = async (
    url: string,
    options: RequestInit = {}
) => {
    const response = await fetch(resolveApiUrl(url), options);
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