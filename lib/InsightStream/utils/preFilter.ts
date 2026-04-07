import { sentimentWords } from "@/constants";

const containsSentiment = (content: string) => {
    const text = content.toLowerCase();
    return sentimentWords.some(word => text.includes(word));
};

export const shouldAnalyzeMention = (
    content: string,
    keyword: string
) => {
    if (!content) return false;
    if (content.length < 20) return false;
    if (!content.toLowerCase().includes(keyword.toLowerCase())) return false;
    if (!containsSentiment(content)) return false;

    return true;
};