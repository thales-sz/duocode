import { Controller, Get } from '@nestjs/common';
import { GroqApiGateway } from './gateway/groq-ai.gateway';

@Controller('app')
export class AppController {
  constructor(private readonly gropApiGateway: GroqApiGateway) {}

  @Get('/question')
  getQuestions() {
    return this.gropApiGateway.getGroqData();
  }
}
