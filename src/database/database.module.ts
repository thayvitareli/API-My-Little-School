import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import CollaboratorRepository from './repositories/collaborator.repository';

@Module({
  exports: [CollaboratorRepository],
  providers: [PrismaService, CollaboratorRepository],
})
export class DatabaseModule {}
