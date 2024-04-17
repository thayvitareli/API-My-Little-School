import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import CollaboratorRepository from './repositories/collaborator.repository';
import StudentRepository from './repositories/student.repository';
import ClassTeamRepository from './repositories/class-team.repository';
import ResponsibleRepository from './repositories/responsible.repository';

@Module({
  exports: [
    CollaboratorRepository,
    StudentRepository,
    ClassTeamRepository,
    ResponsibleRepository,
  ],
  providers: [
    PrismaService,
    CollaboratorRepository,
    StudentRepository,
    ClassTeamRepository,
    ResponsibleRepository,
  ],
})
export class DatabaseModule {}
