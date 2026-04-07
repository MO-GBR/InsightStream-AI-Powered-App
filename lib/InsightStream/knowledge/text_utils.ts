process.env.PDFJS_DISABLE_WORKER = "true";
import { PDFParse } from 'pdf-parse';

export const removeExtension = (filename: string) => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) return filename;
    return filename.slice(0, lastDotIndex);
}

export const chunkText = (text: string, chunkSize = 500) => {
    const words = text.split(" ");
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(" "));
    }

    return chunks;
};

export const fileToBuffer = async (file: any): Promise<Buffer> => {
    if (file.size > 5_000_000) throw new Error("File too large");

    if (file.arrayBuffer) {
        const ab = await file.arrayBuffer();
        return Buffer.from(ab);
    };
  
    if (file.createReadStream) {
        const chunks: Buffer[] = [];
        const stream = file.createReadStream();
        for await (const chunk of stream) chunks.push(chunk);
        return Buffer.concat(chunks);
    };
  
    throw new Error("Unsupported file type");
};

export const extractText = async (file: File) => {
    const buffer = await fileToBuffer(file);
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text.replace(/\r/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/[ \t]{2,}/g, " ")
        .trim();;
};