import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateText(prompt) {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input:
        prompt +
        "\n\nPlease generate a blog post based on the above title. The blog post should be at least 500 words long and should be well-structured with headings, subheadings, and paragraphs. Please ensure that the content is original and not copied from any other source.",
    });
    return interaction.output_text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}

export default generateText;
