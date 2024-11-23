import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FindQuestionsDto } from './dto/find-questions.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findQuestions(@Query() findQuestionsDto: FindQuestionsDto) {
    return this.questionService.findQuestions(findQuestionsDto);
  }

  @Post('/register')
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Delete('/:questionId')
  async delete(@Param('questionId', new ParseUUIDPipe()) questionId: string) {
    return this.questionService.delete(questionId);
  }
}
