import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Query,
} from '@nestjs/common';
import { ClassGroupsService } from './class-groups.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { FindManyDto } from 'src/utils/dto/find-many.dto';

@Controller('class-groups')
export class ClassGroupsController {
  constructor(private readonly classGroupsService: ClassGroupsService) {}

  @Post()
  create(@Body() createClassGroupDto: CreateClassGroupDto, @Request() request) {
    console.log(request.user);
    return this.classGroupsService.create({
      ...createClassGroupDto,
      schoolId: request.user.schoolId,
      userId: request.user.userId,
    });
  }

  @Get()
  findAll(@Query() findMany: FindManyDto) {
    return this.classGroupsService.findAll(findMany);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classGroupsService.findOne(+id);
  }
}
