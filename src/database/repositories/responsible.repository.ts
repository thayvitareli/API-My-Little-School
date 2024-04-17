import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class ResponsibleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    where: Prisma.responsibleWhereInput,
    select?: Prisma.responsibleSelect,
  ) {
    return await this.prisma.responsible.findFirst({ where, select });
  }

  async create(data: Prisma.responsibleCreateInput) {
    return await this.prisma.responsible.create({ data });
  }

  async findMany(
    where: Prisma.responsibleWhereInput,
    skip?: number,
    take?: number,
    select?: Prisma.responsibleSelect,
  ) {
    return await this.prisma.responsible.findMany({
      where,
      skip,
      take,
      select,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async update(id: number, data: Prisma.responsibleUpdateInput) {
    return await this.prisma.responsible.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.responsible.delete({ where: { id } });
  }

  async count(where: Prisma.responsibleWhereInput) {
    return await this.prisma.responsible.count({ where });
  }
}
