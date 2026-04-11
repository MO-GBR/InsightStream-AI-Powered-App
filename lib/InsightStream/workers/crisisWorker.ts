import { prisma } from "@/lib/prisma";
import { detectCrisis } from "../crisis/crisisEngine";
import { emitEvent } from "../utils/workerUtils";

export const runCrisisWorker = async () => {
    const projects = await prisma.project.findMany();

    for (const project of projects) {
        const payload = await detectCrisis(project.id);

        if(payload) {
            const detectedCrisis = await prisma.crisis.create({
                data: {
                    projectId: project.id,
                    severity: payload.severity,
                    message: payload.message,
                    score: payload.score,
                    negativeRate: payload.negativeRate,
                    crisisRate: payload.crisisRate,
                    volumeSpike: payload.volumeSpike
                }
            });

            emitEvent('CRISIS_DETECTED', {
                crisisId: detectedCrisis.id
            });
        }
    }
};