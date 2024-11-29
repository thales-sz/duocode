import { Body, Controller, Post } from '@nestjs/common';
import { GroqApiGateway } from './gateway/groq-ai.gateway';
import { AppQuestionDto } from './dto/app-questio.dto';

@Controller('app')
export class AppController {
  constructor(private readonly gropApiGateway: GroqApiGateway) {}

  @Post('/question')
  getQuestions(@Body() appQuestionDto: AppQuestionDto) {
    return this.gropApiGateway.getGroqData(appQuestionDto);
  }
}
