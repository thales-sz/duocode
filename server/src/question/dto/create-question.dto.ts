import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isMultipleChoice: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  context: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  choices: object;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1)
  rightAnswer: string;
}
