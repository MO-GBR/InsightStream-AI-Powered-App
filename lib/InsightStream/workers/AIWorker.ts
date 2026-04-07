import { prisma } from "@/lib/prisma";
import { runSentimentPipeline } from "../sentiment/sentimentPipeline";
import { detectCrisis } from "../crisis/crisisEngine";

type MentionEventPayload = {
    mentionId: string
};

type CrisisEventPayload = {
    crisisId: string;
    projectId: string;
};

export const runAIWorker = async () => {
    const events = await prisma.event.findMany({
        where: { status: 'pending' },
        take: 10
    });

    for(const event of events) {
        if(event.type === 'MENTION_CREATED') {
            const payload = event.payload as MentionEventPayload | null;

            if (!payload?.mentionId) return;

            await runSentimentPipeline(payload.mentionId);
        }

        if(event.type === 'CRISIS_DETECTED') {
            const payload = event.payload as CrisisEventPayload | null;

            if (!payload?.crisisId) return;

            await detectCrisis(payload.projectId);
        }

        await prisma.event.update({
            where: { id: event.id },
            data: { status: 'done' }
        });
    }
};