import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createBriefing } from "../briefing/createBriefing";
import { emitEvent } from "../utils/workerUtils";

export const briefingWorker = async () => {
    try {
        const session = await auth();
        const projects = await prisma.project.findMany({
            where: {
                userId: session?.user?.id
            }
        });

        for (const project of projects) {
            const briefing = await createBriefing(project.id);
            await emitEvent('BRIEFING_CREATE', {
                id: briefing.id,
                audioUrl: briefing.audioUrl
            })
        };
    } catch (error) {
        console.log('AI Briefing Error', error);
    }
};