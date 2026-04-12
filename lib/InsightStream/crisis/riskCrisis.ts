import { prisma } from "@/lib/prisma";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export const scanRisk = async (projectId: string) => {
    if (!projectId) {
        throw new Error("scanRisk requires a valid projectId");
    }
    const now = new Date();

    const windowMs = 1000 * 60 * 15; // 15 minutes
    const currentSince = new Date(now.getTime() - windowMs);
    const previousSince = new Date(currentSince.getTime() - windowMs);

    console.log('id >>.>>', projectId);

    // 1) Current window
    const current = await prisma.analysis.findMany({
        where: {
            mention: {
                projectId,
                createdAt: { gte: currentSince }
            }
        }
    });

    // 2) Previous window
    const previous = await prisma.analysis.findMany({
        where: {
            mention: {
                projectId,
                createdAt: {
                    gte: previousSince,
                    lt: currentSince
                }
            }
        }
    });

    if (current.length < 5 || previous.length < 5) {
        return {
            risk: "LOW",
            message: "Not enough data to assess risk yet.",
            mentionsSpike: "0%",
            topKeyword: "N/A"
        };
    }

    // 3) Compute negative rates
    const getNegativeRate = (arr: typeof current) => {
        const negative = arr.filter(
            a => a.label === "Negative" || a.label === "Crisis"
        );

        return {
            rate: negative.length / arr.length,
            negativeMentions: negative
        };
    };

    const { rate: currentRate, negativeMentions } = getNegativeRate(current);
    const { rate: previousRate } = getNegativeRate(previous as any);

    // 4) Change %
    const change = currentRate - previousRate;

    // 5) Mentions spike %
    const spike = ((current.length - previous.length) / previous.length) * 100;

    const mentionsSpike = `${spike >= 0 ? "+" : ""}${spike.toFixed(0)}%`;

    // 6) Risk logic
    let risk: RiskLevel = "LOW";

    if (change > 0.25 || spike > 200) {
        risk = "HIGH";
    } else if (change > 0.1 || spike > 100) {
        risk = "MEDIUM";
    }

    // 6) Extract Top Keyword (simple NLP)
    const keywordMap: Record<string, number> = {};

    for (const item of negativeMentions) {
        const mention = await prisma.mention.findUnique({
            where: { id: item.mentionId }
        });

        const text = mention?.content.toLowerCase();

        // simple tokenization
        const words = text?.split(/\W+/).filter(w => w.length > 4) || [];

        for (const word of words) {
            keywordMap[word] = (keywordMap[word] || 0) + 1;
        }
    }

    // get most frequent word
    const topKeyword = Object.entries(keywordMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
    // 7) Message
    const percent = Math.abs(change * 100).toFixed(0);

    let message = "Stable sentiment.";

    if (risk === "MEDIUM") {
        message = `⚠️ Negative sentiment increased by +${percent}% in the last 15 minutes.`;
    }

    if (risk === "HIGH") {
        message = `🚨 Sharp increase in negative sentiment (+${percent}%) with rising mentions.`;
    }


    return {
        risk,
        message,
        mentionsSpike,
        topKeyword
    };
};