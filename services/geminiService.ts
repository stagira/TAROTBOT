import { GoogleGenAI } from "@google/genai";
import { DrawnCard, Spread } from "../types";

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

export async function getTarotInterpretation(question: string, cards: DrawnCard[], spread: Spread): Promise<string> {
  const cardDetails = cards
    .map(c => `- Carte ${c.positionNumber} (${c.position}): ${c.card.name} (${c.orientation === 'upright' ? 'droite' : 'renversée'})`)
    .join('\n');

  const prompt = `Agis comme un tarologue expert, bienveillant, et profondément psychologique, spécialisé dans le Tarot de Marseille.
L'utilisateur a posé la question suivante : "${question}"

Il a choisi d'utiliser le tirage nommé "${spread.title}", dont le but est de : "${spread.purpose}".

Voici son tirage et la signification de chaque position :
${cardDetails}

Fournis une interprétation riche, introspective et structurée en suivant ces étapes :
1.  **Analyse Individuelle des Cartes**: Pour chaque carte, dans l'ordre du tirage (de 1 à ${cards.length}), donne une interprétation détaillée. Rappelle son numéro de position, la signification de cette position, le nom de la carte, et explique sa signification symbolique et psychologique en lien direct avec la question de l'utilisateur ET la signification de son emplacement dans ce tirage spécifique.
2.  **Dynamique du Tirage (Synthèse)**: Crée des liens entre les cartes. Comment interagissent-elles ? Y a-t-il une progression, un conflit, une résonance entre elles ? Révèle l'histoire que les cartes racontent ensemble pour répondre à la question initiale.
3.  **Conseil et Action**: Conclus avec un message clé clair et un conseil pratique. Que doit comprendre l'utilisateur ? Quelle action ou quel changement de perspective est suggéré pour avancer ?

Ton ton doit être inspirant, non-fataliste, et centré sur le pouvoir personnel et le développement de l'utilisateur. Utilise un langage visuel et poétique pour évoquer les arcanes, mais reste toujours clair et compréhensible. Formate ta réponse en Markdown pour une meilleure lisibilité (titres, listes, gras).`;

  return generateGeminiResponse(prompt);
}
