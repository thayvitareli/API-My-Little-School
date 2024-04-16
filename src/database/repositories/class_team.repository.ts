import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class class_teamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    where: Prisma.class_teamWhereInput,
    select?: Prisma.class_teamSelect,
  ) {
    return await this.prisma.class_team.findFirst({ where, select });
  }

  async create(data: Prisma.class_teamCreateInput) {
    return await this.prisma.class_team.create({ data });
  }

  async findMany(
    where: Prisma.class_teamWhereInput,
    skip?: number,
    take?: number,
    select?: Prisma.class_teamSelect,
  ) {
    return await this.prisma.class_team.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async update(id: number, data: Prisma.class_teamUpdateInput) {
    return await this.prisma.class_team.update({ where: { id }, data });
  }
}
