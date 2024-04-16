import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class StudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    where: Prisma.studentWhereInput,
    select?: Prisma.studentSelect,
  ) {
    return await this.prisma.student.findFirst({ where, select });
  }

  async create(data: Prisma.studentCreateInput) {
    return await this.prisma.student.create({ data });
  }

  async findMany(
    where: Prisma.studentWhereInput,
    skip?: number,
    take?: number,
    select?: Prisma.studentSelect,
  ) {
    return await this.prisma.student.findMany({ where, skip, take, select });
  }

  async update(id: number, data: Prisma.studentUpdateInput) {
    return await this.prisma.student.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.student.delete({ where: { id } });
  }
}
