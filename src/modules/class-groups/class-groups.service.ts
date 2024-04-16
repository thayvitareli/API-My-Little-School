import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Search,
} from '@nestjs/common';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import ClassTeamRepository from 'src/database/repositories/class-team.repository';
import CollaboratorRepository from 'src/database/repositories/collaborator.repository';
import httpMessagesCommon from 'src/common/http-messages.common';
import { FindManyDto } from './dto/find-many.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClassGroupsService {
  constructor(
    private readonly classTeamRepositoy: ClassTeamRepository,
    private readonly collaboratorRepository: CollaboratorRepository,
  ) {}

  async create({ name, maxStudents, schoolId, userId }: CreateClassGroupDto) {
    const collaborator = await this.collaboratorRepository.findOne({
      id: userId,
    });

    if (!collaborator)
      throw new NotFoundException(httpMessagesCommon.collaboratorNotFound);

    if (collaborator.privilege !== 1)
      throw new BadRequestException(httpMessagesCommon.permissionDenied);

    const newClass = await this.classTeamRepositoy.create({
      name,
      school: { connect: { id: schoolId } },
      maxStudents,
    });

    return newClass;
  }

  async findAll({ search, skip, take }: FindManyDto) {
    let where: Prisma.class_teamWhereInput;

    if (Search) where = { name: { contains: search } };

    const records = await this.classTeamRepositoy.findMany(where, skip, take);

    const total = await this.classTeamRepositoy.count(where);

    return { total, records };
  }

  async findOne(id: number) {
    const classGroup = await this.classTeamRepositoy.findOne({ id });

    if (!classGroup) throw new NotFoundException(httpMessagesCommon.notFound);

    return classGroup;
  }
}
