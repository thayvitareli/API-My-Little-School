import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindManyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsNumber()
  skip: number;

  @Transform(({ value }) => JSON.parse(value))
  @IsNumber()
  take: number;
}
