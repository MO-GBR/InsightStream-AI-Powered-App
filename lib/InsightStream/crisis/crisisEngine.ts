import { prisma } from "@/lib/prisma";

export const detectCrisis = async (projectId: string) => {
    // Time window for crisis detection (e.g., last 24 hours)
    const timeWindow = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Fetch Analysis for the project within the time window
    const analyses = await prisma.analysis.findMany({
        where: {
            mention: {
                projectId,
                createdAt: {
                    gte: timeWindow
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            mention: true
        }
    });

    if (analyses.length < 5) return;

    // Simple crisis detection logic: if we have more than 5 negative mentions in the last 24 hours, we consider it a crisis
    // Signals
    const negativeCount = analyses.filter(
        a => a.label === "Negative" || a.label === "Crisis"
    ).length;

    const crisisSignals = analyses.filter(a => a.isCrisis === true).length;

    // Rate
    const total = analyses.length;
    const negativeRate = negativeCount / total;
    const crisisRate = crisisSignals / total;

    // Previous window (baseline)
    const previousWindow = new Date(Date.now() - 48 * 60 * 60 * 1000);

    // Previous analyses for baseline comparison
    const previousAnalyses = await prisma.analysis.findMany({
        where: {
            mention: {
                projectId,
                createdAt: {
                    gte: previousWindow,
                    lt: timeWindow
                }
            }
        }
    });

    const prevTotal = previousAnalyses.length || 1; // Avoid division by zero
    const volumeSpike = total / prevTotal;

    // Score
    let score = 0;

    // sentiment signal
    if (negativeRate > 0.6) score += 0.4;
    else if (negativeRate > 0.4) score += 0.25;

    // AI crisis signal (VERY powerful)
    if (crisisRate > 0.2) score += 0.4;
    else if (crisisRate > 0.1) score += 0.25;

    // volume spike
    if (volumeSpike > 2) score += 0.2;

    score = Math.min(score, 1);

    if (score < 0.5) return null;

    // Severity
    let severity = "LOW";
    if (score > 0.8) severity = "HIGH";
    else if (score > 0.65) severity = "MEDIUM";

    return {
        severity,
        message: `🚨 ${severity} crisis: ${(negativeRate * 100).toFixed(0)}% negative 
            | ${(crisisRate * 100).toFixed(0)}% flagged by AI 
            | x${volumeSpike.toFixed(1)} volume
        `,
        score,
        negativeRate,
        crisisRate,
        volumeSpike,
    };
};