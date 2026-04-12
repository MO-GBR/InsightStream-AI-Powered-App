import { prisma } from "@/lib/prisma";
import { AI_GEMINI, generateContent } from "../utils/AI";

export const generateResponse = async (mentionId: string) => {
    const mention = await prisma.mention.findUnique({
        where: { id: mentionId },
        include: {
            analysis: true,
            project: true
        }
    });

    if(!mention) return;
    // only respond to negative mentions
    if (mention.analysis?.label !== "Negative") return;

    const existing = await prisma.responseSuggestion.findFirst({
        where: { mentionId }
    });
      
    if (existing) return;

    const prompt = `
        You are a professional social media manager.

        A user posted the following complaint about the brand "${mention.project.name}".

        User message:

        "${mention.content}"

        Write a short, polite, professional reply from the brand.

        Rules:
        - Be empathetic
        - Do not admit legal liability
        - Offer help
        - Maximum 2 sentences
    `;

    const response = await generateContent(prompt, 'puter');

    if(!response) return;
    
    await prisma.responseSuggestion.create({
        data: {
            mentionId,
            projectId: mention.projectId,
            response,
            tone: 'professional'
        }
    });
};