import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private apiKey: string | null = null;
  private genAI: GoogleGenerativeAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.apiKey = apiKey;
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.genAI) {
      throw new Error("API key não configurada");
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Erro ao chamar Gemini API:", error);
      throw new Error("Erro ao gerar resposta da IA");
    }
  }
}

export const geminiService = new GeminiService();