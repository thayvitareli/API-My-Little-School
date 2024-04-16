import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCollaboratorDto } from './create-collaborator.dto';

export class UpdateCollaboratorDto extends PartialType(
  OmitType(CreateCollaboratorDto, ['name', 'privilege']),
) {}
