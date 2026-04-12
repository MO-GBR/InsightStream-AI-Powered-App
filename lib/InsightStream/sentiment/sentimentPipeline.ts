import { prisma } from "../../prisma";
import { AI_GEMINI, generateContent } from "../utils/AI";
import { emitEvent } from "../utils/workerUtils";
import { generateResponse } from "./responseGenerate";

export const runSentimentPipeline = async (mentionId: string) => {
    const mention = await prisma.mention.findUnique({
        where: { id: mentionId },
        include: { project: true }
    });

    if (!mention) throw new Error("Mention not found");

    const prompt = `
        You are a brand social monitoring AI. 
        Analyze the following mention for sentiment:
        "${mention.content}"
        Return ONLY valid JSON with keys:
        - sentimentScore (0-100)
        - label ("Positive", "Negative", "Neutral", "Crisis")
        - vibeColor (hex)
        - summary (short 20-40 word summary)
        - isCrisis (true/false)
    `;

    const raw = await generateContent(prompt, 'puter') || '';
    let data;
    try {
        data = JSON.parse(raw)
    } catch (error) {
        data = {
            sentimentScore: 50,
            label: "Neutral",
            vibeColor: "#9CA3AF",
            summary: mention.content.slice(0, 100),
            isCrisis: false
        };
    };

    const analysis = await prisma.analysis.create({
        data: {
            mentionId,
            sentimentScore: data.sentimentScore,
            label: data.label,
            vibeColor: data.vibeColor,
            summary: data.summary,
            isCrisis: data.isCrisis
        }
    });

    emitEvent("SENTIMENT_ANALYZED", { mentionId, projectId: mention.projectId });

    if (analysis.label === 'Negative') await generateResponse(mention.id)

    // return analysis;
};