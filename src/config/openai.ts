// openai.ts

import axios from 'axios';

// OpenAI class to interact with OpenAI API
export class OpenAI {
    private apiKey: string;
    private baseUrl: string = 'https://api.openai.com/v1'; // Example base URL for OpenAI API

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    // Example method to call OpenAI API
    async analyzeEmail(emailText: string): Promise<string> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/engine/completions`,
                {
                    prompt: emailText,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error analyzing email with OpenAI:', error);
            throw new Error('Failed to analyze email');
        }
    }
}
