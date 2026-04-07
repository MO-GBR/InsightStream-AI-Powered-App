import { prisma } from "@/lib/prisma";
import { AI_GEMINI } from "../utils/AI";
import { extractText, chunkText, removeExtension } from "./text_utils";

export const embedText = async (text: string) => {
    const result = await AI_GEMINI.models.embedContent({
        model: "text-embedding-004",
        contents: text
    });

    return result.embeddings?.values
};

export const Document_RAG_Process = async (file: File) => {
    const text = await extractText(file);

    const documentTypes: string[] = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if(!documentTypes.includes(file.type)) throw new Error('Invalid document type');

    const chuncks = chunkText(text);
    
    console.log('chuncks >>>>>', chuncks);
    /*
    const document = await prisma.document.create({
        data: {
            fileName: removeExtension(file.name),
            projectId,
            type: file.type
        }
    });

    for (const chunck of chuncks) {
        const embedding = await embedText(chunck);
        await prisma.$executeRaw`
            INSERT INTO "Chunk" (
                "id",
                "content",
                "docId",
                "embedding"
            ) VALUES (
                ${crypto.randomUUID()},
                ${chunck},
                ${document.id},
                ${embedding}::vector
            )
        `;
    }
    */
};
