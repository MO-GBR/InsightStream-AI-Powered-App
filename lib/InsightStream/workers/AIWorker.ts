import { prisma } from "@/lib/prisma";
import { runSentimentPipeline } from "../sentiment/sentimentPipeline";

type MentionEventPayload = {
    mentionId: string
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

        await prisma.event.update({
            where: { id: event.id },
            data: { status: 'done' }
        });
    }
};