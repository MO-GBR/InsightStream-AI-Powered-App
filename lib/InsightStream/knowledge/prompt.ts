import { prisma } from "@/lib/prisma";
import { retrieveMemory } from "./chatMemory";
import { vectorSearch } from "./retrieveContext";
import { embedQuery } from "../utils/AI";

export const promptBuilder = async (projectId: string, query: string) => {
    const queryEmbedding = await embedQuery(query)

    const memory = await retrieveMemory(projectId);

    const chunks = await vectorSearch({
        queryEmbedding,
        projectId,
    });

    const context = chunks.map(c => c.content).join("\n\n");

    const brandVoice = await prisma.brandVoice.findUnique({
        where: { projectId }
    });

    return `
        You are an AI assistant that answers based ONLY on provided context.
        You are the official social media manager of a company.

        ${
            brandVoice ? (
                `
                    Brand voice:
                    Tone: ${brandVoice?.tone}
                    Style: ${brandVoice?.style}
                    Length: ${brandVoice?.responseSize}
                    Emoji level: ${brandVoice?.emojiLevel}
                `
            ) : (
                `
                    Use a neutral and professional tone in your responses.
                `
            )
        }

        Brand Context:
        ${context}

        Conversation history:
        ${memory}

        Customer message:
        ${query}

        Write the best response for the brand.

        Rules:
        - Answer only from context
        - If unsure, say "I don't know"
    `;
};