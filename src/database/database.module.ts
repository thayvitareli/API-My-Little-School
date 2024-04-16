import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import CollaboratorRepository from './repositories/collaborator.repository';
import StudentRepository from './repositories/student.repository';
import ClassTeamRepository from './repositories/class-team.repository';

@Module({
  exports: [CollaboratorRepository, StudentRepository, ClassTeamRepository],
  providers: [
    PrismaService,
    CollaboratorRepository,
    StudentRepository,
    ClassTeamRepository,
  ],
})
export class DatabaseModule {}
