import { GoogleGenAI } from "@google/genai";

const key = process.env.GEMINI_API_KEY;

export const AI_GEMINI = new GoogleGenAI({
    apiKey: key
});