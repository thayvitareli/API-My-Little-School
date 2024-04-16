import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsNumber()
  maxStudents: number;

  schoolId: number;
  userId: number;
}
