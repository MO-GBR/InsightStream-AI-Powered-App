import { prisma } from "@/lib/prisma";
import { embedText } from "./embedding_RAG";
import { ChunckType } from "@/types";

export const similaritySearch = async (embedding: number[] | any) => {
    const result = await prisma.$queryRawUnsafe<ChunckType[]>(`
        SELECT content
        FROM "Chunk"
        ORDER BY embedding <-> $1
        LIMIT 5
    `, embedding);

    return result;
};

export const Retrieve_Context = async (query: string) => {
    const queryEmbedding = await embedText(query);

    const chuncks = await similaritySearch(queryEmbedding)

    return chuncks.map(c => c.content).join("\n");
};