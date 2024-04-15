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
}
