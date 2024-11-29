import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AppQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  context: string;
}
