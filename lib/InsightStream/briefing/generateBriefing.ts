import { prisma } from "@/lib/prisma";
import { AI_GEMINI } from "../utils/AI";

export const generateBriefingText = async (projectId: string) => {
    const mentions = await prisma.mention.findMany({
        where: {
            projectId,
            createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 50
    });

    const prompt = `
        You are an executive communications assistant.
        Create a concise daily briefing based on these mentions:
        ${mentions.map(m => `- ${m.content}`).join("\n")}
        Structure:
        1. Executive summary
        2. Sentiment overview
        3. Key risks
        4. Recommended actions
    `;

    const response = await AI_GEMINI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });

    return response.text;
};