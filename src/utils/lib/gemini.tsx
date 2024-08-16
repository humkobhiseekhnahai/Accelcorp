import { GoogleGenerativeAI } from "@google/generative-ai";

declare global {
  interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
export {};

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default async function Gemini(prompt:string) {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY)
        const model = genAI.getGenerativeModel({model : "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Gemini text:", text);

    } catch (error) {
        console.log("fetchDataGeminiAPIError", error);
    }

}