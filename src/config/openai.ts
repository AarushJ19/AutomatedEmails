import axios from "axios";

const OPENAI_API_BASE_URL = "https://api.openai.com/v1"; // Example base URL, adjust as needed

class OpenAI {
  private apiKey: string;

  constructor(apiKey: string = process.env.OPENAI_API_KEY || "") {
    this.apiKey = apiKey;
  }

  async createCompletion(params: any) {
    try {
      const response = await axios.post(
        `${OPENAI_API_BASE_URL}/completions`,
        params,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export { OpenAI };
