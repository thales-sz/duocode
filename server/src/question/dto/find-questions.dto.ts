import { IsNotEmpty, IsString } from 'class-validator';

export class FindQuestionsDto {
  @IsNotEmpty()
  @IsString()
  language: string;
}
