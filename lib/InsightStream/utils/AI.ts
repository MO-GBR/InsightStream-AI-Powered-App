// AI - Gemini and Puter integration for content generation and sentiment analysis.
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

// Load environment variables for API keys
const puterToken = process.env.PUTER_JS_AUTHENTICATION_TOKEN;
const key = process.env.GEMINI_API_KEY;

// Initialize Puter and OpenAI clients with the respective API keys
const AI_OPENAI = new OpenAI({
    baseURL: "https://api.puter.com/puterai/openai/v1/",
    apiKey: puterToken
});

// Initialize Google Gemini client with the API key
export const AI_GEMINI = new GoogleGenAI({
    apiKey: key
});

// Function to generate content based on the provided prompt and mode (either 'gemini' or 'puter')
export const generateContent = async (prompt: string, mode: string) => {
    if(mode === 'gemini') {
        const response = await AI_GEMINI.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt
        });
    
        return response.text;
    }

    if(mode === 'puter') {
        const response = await AI_OPENAI.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant for brand monitoring and sentiment analysis." },
                { role: "user", content: prompt }
            ]
        });
        return response.choices[0].message.content;
    }
};

// Embedding Text using Puter's embedding API
export async function embedChunks(chunks: string[]) {
    const embeddings = await AI_OPENAI.embeddings.create({
        model: "text-embedding-3-small",
        input: chunks,
    });
    return embeddings.data.map(e => e.embedding);
};

export async function embedQuery(query: string) {
    const res = await AI_OPENAI.embeddings.create({
        model: "text-embedding-3-small",
        input: query,
    });
    return res.data[0].embedding;
}