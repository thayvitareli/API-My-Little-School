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

@Injectable()
export class StudentsService {
  constructor(private readonly studentRepository: StudentRepository) {}
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

    return await this.studentRepository.create(data);
  }

  async findAll({ name, status, skip, take }: FindManyDto) {
    let where: Prisma.studentWhereInput = {};

    if (name) {
      where = { ...where, name: { contains: name } };
    }

    if (status) {
      where = { ...where, status };
    }

    if (!status) {
      where = { ...where, status };
    }

    const records = await this.studentRepository.findMany(where, skip, take);

    const total = await this.studentRepository.count(where);

    return { total, records };
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({ id });

    if (!student)
      throw new NotFoundException(httpMessagesCommon.studentNotFound);

    return student;
  }

  async update(id: number, { class_id, status }: UpdateStudentDto) {
    console.log(id);
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
