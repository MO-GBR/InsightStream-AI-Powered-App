import { prisma } from "@/lib/prisma";
import { emitEvent } from "../utils/workerUtils";

export const detectCrisis = async (projectId: string) => {
    const now = new Date();

    const currentWindow = new Date(now.getTime() - 15 * 60 * 1000);
    const previousWindow = new Date(now.getTime() - 30 * 60 * 1000);

    const currentNegatives = await prisma.analysis.count({
        where: {
            label: "Negative",
            mention: { projectId },
            createdAt: { gte: currentWindow }
        }
    });

    const previousNegatives = await prisma.analysis.count({
        where: {
            label: "Negative",
            mention: { projectId },
            createdAt: { gte: previousWindow, lt: currentWindow }
        }
    });

    if(previousNegatives === 0) return;

    const spikeRatio = currentNegatives / previousNegatives;

    if (spikeRatio >= 2 && currentNegatives >= 10) {

        const detectedCrisis = await prisma.crisis.create({
            data: {
                projectId,
                severity: "high",
                message: `Negative sentiment spike detected (${currentNegatives} mentions)`
            }
        });
        console.log("🚨 Crisis detected!");

        emitEvent("CRISIS_DETECTED", {
            crisisId: detectedCrisis.id,
            projectId: detectedCrisis.projectId
        });
    }
};