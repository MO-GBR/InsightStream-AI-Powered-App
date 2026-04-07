import { prisma } from "@/lib/prisma";
import { retrieveMemory } from "./chatMemory";
import { Retrieve_Context } from "./retrieveContext";

export const promptBuilder = async (projectId: string, mention: string) => {
    const knowledge = await Retrieve_Context(mention);

    const memory = await retrieveMemory(projectId);

    const brandVoice = await prisma.brandVoice.findUnique({
        where: { projectId }
    });

    return `
        You are the official social media manager of a company.

        Brand voice:
        Tone: ${brandVoice?.tone}
        Style: ${brandVoice?.style}
        Length: ${brandVoice?.responseSize}
        Emoji level: ${brandVoice?.emojiLevel}

        Brand knowledge:
        ${knowledge}

        Conversation history:
        ${memory}

        Customer message:
        ${mention}

        Write the best response for the brand.
    `;
};