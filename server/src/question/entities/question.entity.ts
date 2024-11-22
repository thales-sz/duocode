import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../common/entity/abstract.entity';

@Entity('questions')
export class Question extends DefaultEntity<Question> {
  @Column({ type: 'boolean', default: true })
  isMultipleChoice: boolean;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text', nullable: true })
  context: string;

  @Column({ type: 'json', nullable: false })
  choices: string;

  @Column({ type: 'text' })
  rightAnswer: string;
}
