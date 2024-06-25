import { OpenAI } from '../config/openai';

async function analyzeEmailContent(content: string) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Categorize the following email content: "${content}"`,
        max_tokens: 60,
    });

    return response.data.choices[0].text.trim();
}

export { analyzeEmailContent };
