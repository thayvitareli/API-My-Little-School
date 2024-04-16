import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import httpMessagesCommon from 'src/common/http-messages.common';
import CollaboratorRepository from 'src/database/repositories/collaborator.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const user = await this.collaboratorRepository.findOne({ email });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) return user;

      throw new BadRequestException(httpMessagesCommon.loginFailed);
    }

    throw new BadRequestException(httpMessagesCommon.loginFailed);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.validateUser({ email, password });

    return {
      name: user.name,
      access_token: this.jwtService.sign({
        userId: user.id,
        schoolId: user.schoolId,
      }),
    };
  }
}
