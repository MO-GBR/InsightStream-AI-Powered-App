import { prisma } from "@/lib/prisma";
import { ChunckType } from "@/types";

export const vectorSearch = async ({
    queryEmbedding,
    projectId,
    topK = 5,
}: {
    queryEmbedding: number[];
    projectId: string;
    topK?: number;
}) => {
    const result = await prisma.$queryRawUnsafe(`
        SELECT c.*
        FROM "Chunk" c
        JOIN "Document" d ON c."docId" = d.id
        WHERE d."projectId" = '${projectId}'
        ORDER BY c.embedding <-> '[${queryEmbedding.join(",")}]'
        LIMIT ${topK};
    `);
    return result as { content: string }[];
};