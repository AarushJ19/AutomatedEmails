import { OpenAI } from "../config/openai";

const openai = new OpenAI(
  "sk-testing-va6UzYSWxe701w9JgF7uT3BlbkFJtuG1zdV8NdHGkcQikDF8"
); // Assuming OpenAI is instantiated properly in config/openai.ts

async function analyzeEmailContent(content: string) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Categorize the following email content: "${content}"`,
      max_tokens: 60,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error analyzing email content:", error);
    throw error; // Optionally handle or rethrow the error as needed
  }
}

export { analyzeEmailContent };
