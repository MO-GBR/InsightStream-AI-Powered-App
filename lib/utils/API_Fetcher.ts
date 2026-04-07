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