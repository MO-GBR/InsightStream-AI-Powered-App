import { GoogleGenAI } from "@google/genai";

const key = process.env.GEMINI_API_KEY || 'AIzaSyAWQHEXslPgiHGASTMEx_GylE3dzsH0x6E';

export const AI_GEMINI = new GoogleGenAI({
    apiKey: key
});