export function normalizeMention(data: any, source: string) {
    if (source === "reddit") {
        return {
            externalId: data.id,
            content: `${data.title} ${data.selftext || ""}`,
            author: data.author?.name || null,
            url: `https://reddit.com${data.permalink}`
        };
    }
    if (source === "rss") {
        return {
            externalId: data.guid,
            content: data.title,
            author: data.creator || null,
            url: data.link
        };
    }
    return null;
}