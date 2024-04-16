import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class CollaboratorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    where: Prisma.collaboratorWhereInput,
    select?: Prisma.collaboratorSelect,
  ) {
    return await this.prisma.collaborator.findFirst({ where, select });
  }

  async create(data: Prisma.collaboratorCreateInput) {
    return await this.prisma.collaborator.create({ data });
  }

  async findMany(
    where: Prisma.collaboratorWhereInput,
    skip?: number,
    take?: number,
    select?: Prisma.collaboratorSelect,
  ) {
    return await this.prisma.collaborator.findMany({
      where,
      skip,
      take,
      select,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async update(id: number, data: Prisma.collaboratorUpdateInput) {
    return await this.prisma.collaborator.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.collaborator.delete({ where: { id } });
  }

  async count(where: Prisma.collaboratorWhereInput) {
    return await this.prisma.collaborator.count({ where });
  }
}
