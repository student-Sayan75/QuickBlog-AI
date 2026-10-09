import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateText(prompt) {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
    });
    return interaction.output_text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}

export default generateText;
