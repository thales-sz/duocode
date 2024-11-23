import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../common/entity/abstract.entity';

@Entity('questions')
export class Question extends DefaultEntity<Question> {
  @Column({ type: 'boolean', default: true })
  isMultipleChoice: boolean;

  @Column({ type: 'string', nullable: false })
  language: string;

  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({ type: 'text', nullable: true })
  context: string;

  @Column({ type: 'json', nullable: false })
  choices: object;

  @Column({ type: 'text', nullable: false })
  rightAnswer: string;
}
