import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsBoolean()
  isMultipleChoice: boolean;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsOptional()
  @IsString()
  context: string;

  @IsNotEmpty()
  @IsObject()
  choices: object;

  @IsNotEmpty()
  @IsString()
  @Length(1)
  rightAnswer: string;
}
