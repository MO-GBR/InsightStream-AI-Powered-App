import { prisma } from "@/lib/prisma";
import { generateBriefingText } from "./generateBriefing";
import { generateBriefingAudio } from "./generateAudio";

export const createBriefing = async (projectId: string) => {
    const summary = await generateBriefingText(projectId);

    if (!summary) throw new Error("Briefing generation failed: empty summary");

    const audioUrl = await generateBriefingAudio(summary);

    const briefing = await prisma.briefing.create({
        data: {
            projectId,
            summary,
            audioUrl
        }
    });

    return briefing;
};