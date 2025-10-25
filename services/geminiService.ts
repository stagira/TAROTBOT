import { GoogleGenAI } from "@google/genai";
import { DrawnCard } from "../types";

async function generateGeminiResponse(prompt: string): Promise<string> {
    try {
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

export async function getTarotInterpretation(question: string, cards: DrawnCard[]): Promise<string> {
  const cardDetails = cards.map(c => `- ${c.position}: ${c.card.name} (${c.orientation})`).join('\n');

  const prompt = `Agis comme un tarologue bienveillant, clair et visuel, spécialisé dans le Tarot de Marseille.
L'utilisateur a posé la question suivante : "${question}"

Voici son tirage à 3 cartes :
${cardDetails}

Fournis une interprétation détaillée et introspective en suivant cette structure :
1.  **Interprétation de chaque carte** : Pour chaque carte, rappelle sa position (Passé, Présent, Futur), son nom, et donne son interprétation dans le contexte de la question. Base-toi sur le symbolisme visuel, la numérologie et les couleurs du TDM.
2.  **Synthèse et Message Clé** : Relie les trois interprétations pour offrir une vue d'ensemble et un conseil final répondant à la question initiale.

Ton ton doit être bienveillant, clair et centré sur l'introspection de l'utilisateur.`;

  return generateGeminiResponse(prompt);
}