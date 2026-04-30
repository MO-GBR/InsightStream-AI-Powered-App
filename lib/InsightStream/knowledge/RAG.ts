import { prisma } from "@/lib/prisma";
import { extractText, chunkText, fileType, removeExtension } from "../utils/text_utils";
import { embedChunks, generateContent, geminiEmbedChunks } from "../utils/AI";
import { promptBuilder } from "./prompt";
import { saveMemory } from "./chatMemory";

export const ingestDocument = async (file: File, projectId: string) => {
    const documentTypes: string[] = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if(!documentTypes.includes(file.type)) throw new Error('Invalid document type');

    const text = await extractText(file);
    const chuncks = chunkText(text);
    
    const document = await prisma.document.create({
        data: {
            fileName: removeExtension(file.name),
            projectId,
            type: fileType(file.type) as string
        }
    });
    
    const embeddings = await geminiEmbedChunks(chuncks);


    await prisma.$transaction(
        chuncks.map((chunk, index) => {
            const embedding = embeddings[index].values;
            if (!embedding) {
                throw new Error(`Missing embedding for chunk index ${index}`);
            }
            const randomId = crypto.randomUUID();
            const embeddingLiteral = `[${embedding.join(',')}]`;
            return prisma.$executeRaw`
                INSERT INTO "Chunk" ("id", "content", "docId", "embedding")
                VALUES (${randomId}, ${chunk}, ${document.id}, ${embeddingLiteral}::vector)
            `;
        })
    );

    return document.id;
};

export const askRAG = async (projectId: string, query: string) => {
    try {
        const prompt = await promptBuilder(projectId, query);
        console.log('prompt >>', prompt)
        const response = await generateContent(prompt, 'gemini') as string;
        await saveMemory(projectId, query, response)
        return response;
    } catch (error) {
        console.error("Error in askRAG:", error);
    }
};
