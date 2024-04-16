import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ra: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsNumber()
  class_id: number;

  @IsArray()
  @ArrayMinSize(1)
  responsible_ids: number[];
}
