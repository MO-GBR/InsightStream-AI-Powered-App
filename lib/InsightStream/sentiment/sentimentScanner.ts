import { prisma } from "@/lib/prisma";

type Trend = "UP" | "DOWN" | "STABLE";

export const sentimentScanner = async (projectId: string) => {
    const now = new Date();

    const windowMs = 1000 * 60 * 30; // 30 min
    const currentSince = new Date(now.getTime() - windowMs);
    const previousSince = new Date(currentSince.getTime() - windowMs);

    // 1) Fetch current
    const current = await prisma.analysis.findMany({
        where: {
            mention: {
                projectId,
                createdAt: { gte: currentSince }
            }
        }
    });

    // 2) Fetch previous
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

    if (current.length < 5) {
        return {
            score: 50,
            label: "Neutral",
            trend: "stable",
            sentiment: 0,
            distribution: {
                positive: 0,
                neutral: 100,
                negative: 0
            }
        };
    }

    // 3) Distribution
    const counts = {
        positive: 0,
        neutral: 0,
        negative: 0
    };

    for (const a of current) {
        if (a.label === "Positive") counts.positive++;
        else if (a.label === "Negative" || a.label === "Crisis") counts.negative++;
        else counts.neutral++;
    }

    const total = current.length;

    const distribution = {
        positive: Math.round((counts.positive / total) * 100),
        neutral: Math.round((counts.neutral / total) * 100),
        negative: Math.round((counts.negative / total) * 100)
    };

    // 4) Score (0 → 100)
    // 1) Average raw score (0 → 100)
    const avgScore = current.reduce((sum, a) => sum + a.sentimentScore, 0) / current.length;

    // 2) Normalize to -1 → +1
    const sentiment = Number(((avgScore - 50) / 50).toFixed(2));

    // 3) Keep UI-friendly score
    const score = Math.round(avgScore);

    // 5) Label
    let label = "Neutral";

    if (score > 65) label = "Positive";
    else if (score < 40) label = "Negative";

    // 6) Trend (compare with previous)
    let trend: Trend = "STABLE";

    if (previous.length > 0) {
        const prevAvg = previous.reduce((sum, a) => sum + a.sentimentScore, 0) / previous.length;
        const prevSentiment = (prevAvg - 50) / 50;
        const diff = sentiment - prevSentiment;

        if (diff > 5) trend = "UP";
        else if (diff < -5) trend = "DOWN";
    }

    return {
        score,
        sentiment,
        label,
        trend,
        distribution
    };
};