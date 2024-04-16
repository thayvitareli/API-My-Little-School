import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import CollaboratorRepository from './repositories/collaborator.repository';
import StudentRepository from './repositories/student.repository';

@Module({
  exports: [CollaboratorRepository, StudentRepository],
  providers: [PrismaService, CollaboratorRepository, StudentRepository],
})
export class DatabaseModule {}
