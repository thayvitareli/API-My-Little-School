import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import StudentRepository from 'src/database/repositories/student.repository';
import httpMessagesCommon from 'src/common/http-messages.common';
import { Prisma } from '@prisma/client';
import { FindManyDto } from './dto/find-many.dto';
import ResponsibleRepository from 'src/database/repositories/responsible.repository';
import ClassTeamRepository from 'src/database/repositories/class-team.repository';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly responsibleRepository: ResponsibleRepository,
    private readonly classTeamRepository: ClassTeamRepository,
  ) {}
  async create({ class_id, name, ra, responsible_ids }: CreateStudentDto) {
    const data: Prisma.studentCreateInput = {
      name,
      ra,
      class: { connect: { id: class_id } },
      responsibles: {
        connect: responsible_ids.map((id) => ({ id })),
      },
    };

    const raAlreadyExist = await this.studentRepository.findOne({
      ra: ra,
    });

    if (raAlreadyExist)
      throw new BadRequestException(httpMessagesCommon.raInUse);

    const responsibleIdExist = await this.responsibleRepository.findMany({
      id: { in: responsible_ids },
    });

    if (responsibleIdExist.length == 0)
      throw new NotFoundException(httpMessagesCommon.responsibleNotFound);

    const classGroup = await this.classTeamRepository.findOne({ id: class_id });

    if (!classGroup)
      throw new NotFoundException(httpMessagesCommon.classNotFound);

    const countStudentsInClass = await this.studentRepository.count({
      class_teamId: class_id,
    });

    if (countStudentsInClass >= classGroup.maxStudents)
      throw new BadRequestException(httpMessagesCommon.classClosed);

    return await this.studentRepository.create(data);
  }

  async findAll({ name, status, skip, take }: FindManyDto) {
    let where: Prisma.studentWhereInput = {};

    const select: Prisma.studentSelect = {
      id: true,
      name: true,
      ra: true,
      created_at: true,
      class: {
        select: {
          name: true,
        },
      },
      responsibles: {
        select: {
          name: true,
          phone: true,
        },
      },
    };

    if (name) {
      where = { ...where, name: { contains: name } };
    }

    if (status) {
      where = { ...where, status };
    }

    if (!status) {
      where = { ...where, status };
    }

    const records = await this.studentRepository.findMany(
      where,
      skip,
      take,
      select,
    );

    const total = await this.studentRepository.count(where);

    return { total, records };
  }

  async findOne(id: number) {
    const select: Prisma.studentSelect = {
      id: true,
      name: true,
      ra: true,
      created_at: true,
      class: {
        select: {
          name: true,
        },
      },
      responsibles: {
        select: {
          name: true,
          phone: true,
        },
      },
    };
    const student = await this.studentRepository.findOne({ id }, select);

    if (!student)
      throw new NotFoundException(httpMessagesCommon.studentNotFound);

    return student;
  }

  async update(id: number, { class_id, status }: UpdateStudentDto) {
    let data: Prisma.studentUpdateInput = {};

    const student = await this.studentRepository.findOne({ id });

    if (!student)
      throw new NotFoundException(httpMessagesCommon.studentNotFound);

    if (class_id) {
      data = { ...data, class: { connect: { id: class_id } } };
    }

    if (status) {
      data = { ...data, status: status };
    }

    if (!status) {
      data = { ...data, status: status };
    }

    await this.studentRepository.update(id, data);

    return { message: 'Atualizado com sucesso' };
  }
}
