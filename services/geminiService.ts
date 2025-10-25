
import { GoogleGenAI } from "@google/genai";

export async function runChat(prompt: string): Promise<string> {
  try {
    // FIX: Removed the explicit check for API_KEY. Per guidelines, we assume it is always available.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Gemini:", error);
    if (error instanceof Error) {
        return `Désolé, une erreur est survenue lors de la communication avec le guide IA: ${error.message}`;
    }
    return "Désolé, une erreur inattendue est survenue.";
  }
}
