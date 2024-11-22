import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  private logger: Logger = new Logger(QuestionService.name);

  constructor(private readonly questionRepostiory: QuestionRepository) {}

  async create(question: CreateQuestionDto): Promise<Question> {
    return this.questionRepostiory.save(question);
  }

  async find() {
    return this.questionRepostiory.find();
  }

  async delete(questionId: string): Promise<void> {
    const existingQuestion =
      await this.questionRepostiory.findOneById(questionId);

    if (!existingQuestion) {
      this.logger.error(
        `Cannot delete question ${questionId}, question does not exists`,
      );
      throw new NotFoundException(
        `Cannot delete question with id ${questionId}`,
      );
    }

    this.questionRepostiory.delete(questionId);
  }
}
