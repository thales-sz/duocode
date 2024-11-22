import Groq from 'groq-sdk';

export class GroqClientFactory {
  static createGroqClient(apiKey: string) {
    return new Groq({
      apiKey,
    });
  }
}
