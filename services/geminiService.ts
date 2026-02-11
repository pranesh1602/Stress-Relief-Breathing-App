
import { GoogleGenAI, Type } from "@google/genai";
import { AIAdvice } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getStressReliefAdvice(moodLabel: string): Promise<AIAdvice> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user is currently feeling "${moodLabel}". Provide personalized stress-relief advice and a short affirmation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 short, actionable stress relief tips."
          },
          affirmation: {
            type: Type.STRING,
            description: "A short, powerful affirmation."
          }
        },
        required: ["tips", "affirmation"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return {
      tips: ["Take a slow walk", "Hydrate with water", "Close your eyes for 1 minute"],
      affirmation: "I am calm and in control of my breath."
    };
  }
}
