import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { FindManyDto } from 'src/utils/dto/find-many.dto';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  create(
    @Body() createCollaboratorDto: CreateCollaboratorDto,
    @Request() request,
  ) {
    return this.collaboratorsService.create(
      createCollaboratorDto,
      request.user,
    );
  }

  @Get()
  findAll(@Query() findMany: FindManyDto) {
    return this.collaboratorsService.findAll(findMany);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorsService.findOne(+id);
  }

  @Patch()
  update(
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
    @Request() request,
  ) {
    return this.collaboratorsService.update(
      request.user.userId,
      updateCollaboratorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    return this.collaboratorsService.remove(+id, request.userId);
  }
}
