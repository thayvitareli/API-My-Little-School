import { Mask } from '@tboerc/maskfy';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponsibleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => Mask.phone.raw(value))
  phone: string;
}
