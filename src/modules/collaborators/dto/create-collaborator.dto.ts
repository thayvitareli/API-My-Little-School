import { Mask } from '@tboerc/maskfy';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => Mask.phone.raw(value))
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsNumber()
  privilege: number;
}
