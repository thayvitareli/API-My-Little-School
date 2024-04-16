import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import CollaboratorRepository from 'src/database/repositories/collaborator.repository';
import httpMessagesCommon from 'src/common/http-messages.common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { FindManyDto } from './dto/find-many.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
  ) {}

  async create(
    { email, name, password, phone, privilege }: CreateCollaboratorDto,
    { userId, schoolId }: { userId: number; schoolId: number },
  ) {
    const collaborator = await this.collaboratorRepository.findOne({
      id: userId,
    });

    if (collaborator.privilege !== 1) {
      throw new BadRequestException(httpMessagesCommon.permissionDenied);
    }

    const emailInUse = await this.collaboratorRepository.findOne({ email });

    if (emailInUse)
      throw new BadRequestException(httpMessagesCommon.emailInUse);

    password = await bcrypt.hash(password, Number(process.env.SALT));

    const data: Prisma.collaboratorCreateInput = {
      email,
      name,
      password,
      phone,
      privilege,
      school: { connect: { id: schoolId } },
    };
    const newCollaborator = await this.collaboratorRepository.create(data);
    delete newCollaborator['password'];

    return newCollaborator;
  }

  async findAll({ skip, take, name }: FindManyDto) {
    let where: Prisma.collaboratorWhereInput;

    if (name) where = { name: { contains: name } };

    const select: Prisma.collaboratorSelect = {
      id: true,
      name: true,
      email: true,
      phone: true,
      privilege: true,
      created_at: true,
    };

    const records = await this.collaboratorRepository.findMany(
      where,
      skip,
      take,
      select,
    );

    const total = await this.collaboratorRepository.count(where);

    return { total, records };
  }

  async findOne(id: number) {
    const collaborator = await this.collaboratorRepository.findOne({ id });

    if (!collaborator) throw new NotFoundException(httpMessagesCommon.notFound);

    return collaborator;
  }

  async update(id: number, { password, email, phone }: UpdateCollaboratorDto) {
    const collaborator = await this.collaboratorRepository.findOne({
      id: id,
    });

    if (!collaborator) {
      throw new BadRequestException(httpMessagesCommon.notFound);
    }

    const emailInUse = await this.collaboratorRepository.findOne({ email });

    if (emailInUse)
      throw new BadRequestException(httpMessagesCommon.emailInUse);

    password = await bcrypt.hash(password, Number(process.env.SALT));

    const data: Prisma.collaboratorUpdateInput = {
      email,
      password,
      phone,
    };

    await this.collaboratorRepository.update(id, data);

    return { message: 'Registro atualizado com sucesso' };
  }

  async remove(id: number, userId: number) {
    const user = await this.collaboratorRepository.findOne({ id: userId });

    if (user.privilege !== 1)
      throw new BadRequestException(httpMessagesCommon.permissionDenied);

    const collaborator = await this.collaboratorRepository.findOne({ id });

    if (!collaborator) throw new NotFoundException(httpMessagesCommon.notFound);

    await this.collaboratorRepository.delete(id);

    return { message: 'Registro excluído com sucesso' };
  }
}
