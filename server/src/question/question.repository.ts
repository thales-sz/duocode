import { Injectable } from '@nestjs/common';
import { DefaultRepository } from '../common/repository/default.repository';
import { Question } from './entities/question.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class QuestionRepository extends DefaultRepository<Question> {
  constructor(readonly dataSource: DataSource) {
    super(Question, dataSource);
  }
}
