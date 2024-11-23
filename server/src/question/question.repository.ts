import { Injectable } from '@nestjs/common';
import { DefaultRepository } from '../common/repository/default.repository';
import { Question } from './entities/question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionRepository extends DefaultRepository<Question> {
  private questionRepository: Repository<Question>;

  constructor(readonly dataSource: DataSource) {
    super(Question, dataSource);
    this.questionRepository = dataSource.getRepository(Question);
  }

  async findQuestions(language: string): Promise<[Question[], number] | null> {
    return this.questionRepository.findAndCount({
      where: {
        language: language,
      },
    });
  }
}
