import {prisma} from "@/lib/prisma";

export const retrieveMemory = async (projectId: string) => {

    const memories = await prisma.conversationMemory.findMany({
        where: { projectId },
        orderBy: { createdAt: "desc" },
        take: 5
    });

    return memories
        .map(m => `User: ${m.input}\nAI: ${m.response}`)
        .join("\n");
}