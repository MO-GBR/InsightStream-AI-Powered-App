import { prisma } from "@/lib/prisma";
import { extractText, chunkText, fileType, removeExtension } from "../utils/text_utils";
import { embedChunks, generateContent, geminiEmbedChunks } from "../utils/AI";
import { promptBuilder } from "./prompt";

export const ingestDocument = async (file: File, projectId: string) => {
    const documentTypes: string[] = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if(!documentTypes.includes(file.type)) throw new Error('Invalid document type');

    const text = await extractText(file);
    const chuncks = chunkText(text);
    
    console.log('chuncks >>>>>', chuncks);

    const document = await prisma.document.create({
        data: {
            fileName: removeExtension(file.name),
            projectId,
            type: fileType(file.type) as string
        }
    });

    // const embeddings = await embedChunks(chuncks);
    const embeddings = await geminiEmbedChunks(chuncks);


    await prisma.chunk.createMany({
        data: chuncks.map((chunk, index) => ({
            content: chunk,
            docId: document.id,
            embedding: embeddings[index]
        }))
    });

    return document.id;
};

export const askRAG = async (projectId: string, query: string) => {
    try {
        const prompt = await promptBuilder(projectId, query);
        const response = await generateContent(prompt, 'puter');
        await prisma.conversationMemory.create({
            data: {
                projectId,
                input: query,
                response: response || ''
            }
        });
        return response;
    } catch (error) {
        console.error("Error in askRAG:", error);
    }
};
