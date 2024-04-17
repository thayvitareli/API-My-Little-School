import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import ResponsibleRepository from 'src/database/repositories/responsible.repository';
import { Prisma } from '@prisma/client';
import { FindManyDto } from 'src/utils/dto/find-many.dto';
import httpMessagesCommon from 'src/common/http-messages.common';

@Injectable()
export class ResponsiblesService {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}

  async create({ name, phone }: CreateResponsibleDto) {
    const data: Prisma.responsibleCreateInput = {
      name,
      phone,
      status: true,
    };

    return await this.responsibleRepository.create(data);
  }

  async findAll({ search, skip, take }: FindManyDto) {
    let where: Prisma.responsibleWhereInput;

    if (search) where = { name: { contains: search } };

    const records = await this.responsibleRepository.findMany(
      where,
      skip,
      take,
    );

    const total = await this.responsibleRepository.count(where);

    return { total, records };
  }

  async findOne(id: number) {
    const responsible = await this.responsibleRepository.findOne({ id });

    if (!responsible) throw new NotFoundException(httpMessagesCommon.notFound);

    return responsible;
  }

  async update(id: number, { name, phone }: UpdateResponsibleDto) {
    let data: Prisma.responsibleUpdateInput = {};

    const responsible = await this.responsibleRepository.findOne({ id });

    if (!responsible) throw new NotFoundException(httpMessagesCommon.notFound);

    if (name) data = { ...data, name };

    if (phone) data = { ...data, phone };

    await this.responsibleRepository.update(id, data);

    return { message: 'Registro atualizado com sucesso' };
  }

  async remove(id: number) {
    const responsible = await this.responsibleRepository.findOne({ id });

    if (!responsible) throw new NotFoundException(httpMessagesCommon.notFound);

    await this.responsibleRepository.delete(id);

    return { message: 'Registro excluído com sucesso' };
  }
}
