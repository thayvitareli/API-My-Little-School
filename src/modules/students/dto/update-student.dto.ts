import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStudentDto extends PartialType(
  OmitType(CreateStudentDto, ['ra']),
) {
  @Transform(({ value }) => JSON.parse(value))
  @IsBoolean()
  status: boolean;
}
