import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import ClassTeamRepository from 'src/database/repositories/class-team.repository';
import CollaboratorRepository from 'src/database/repositories/collaborator.repository';
import httpMessagesCommon from 'src/common/http-messages.common';

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

  findAll() {
    return `This action returns all classGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classGroup`;
  }

  update(id: number, updateClassGroupDto: UpdateClassGroupDto) {
    return `This action updates a #${id} classGroup`;
  }
}
