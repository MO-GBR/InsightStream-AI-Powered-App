import { prisma } from "@/lib/prisma";
import { generateBriefingText } from "./generateBriefing";
import { generateBriefingAudio } from "./generateAudio";

export const createBriefing = async (projectId: string) => {
    // const summary = await generateBriefingText(projectId);
    const summary = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

    if (!summary) throw new Error("Briefing generation failed: empty summary");

    const audioUrl = await generateBriefingAudio(summary, projectId);

    const briefing = await prisma.briefing.create({
        data: {
            projectId,
            summary,
            audioUrl
        }
    });

    return briefing;
};