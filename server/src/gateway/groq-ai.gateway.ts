import { Injectable } from '@nestjs/common';
import { GroqClientFactory } from '../factory/create-groq-client';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

@Injectable()
export class GroqApiGateway {
  private groqClient: Groq;

  constructor(private readonly configService: ConfigService) {
    this.groqClient = GroqClientFactory.createGroqClient(
      this.configService.getOrThrow<string>('GROQ_API_KEY'),
    );
  }

  async getGroqData() {
    const chatCompletion = await this.groqClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Oi',
        },
      ],
      model: 'llama3-8b-8192',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    for await (const chunk of chatCompletion) {
      console.log(chunk.choices[0]?.delta?.content || '');
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
  }
}
