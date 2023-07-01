import { AuthRepository } from '../auth-repository';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SignInBody } from 'src/auth/dtos/signin.body';
import { SignUpBody } from 'src/auth/dtos/signup.body';
import { AuthTokenService } from 'src/auth/utils/auth-token.service';
import { SignUpResponse } from 'src/auth/dtos/signup.response';
import { SignInResponse } from 'src/auth/dtos/signin.response';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/utils/password.service';
import { DuplicatedFieldException } from 'src/shared/exceptions/duplicated-field.exception';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private authTokenService: AuthTokenService,
  ) {}

  async signUp(body: SignUpBody): Promise<SignUpResponse> {
    try {
      const password = await this.passwordService.hashPassword(body.password);

      const user = await this.prisma.user.create({
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          cpf: body.cpf,
          password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      const authToken = await this.authTokenService.generateToken(user.id);
      return {
        auth_token: authToken,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      console.log({ errormessage: error.message });

      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new DuplicatedFieldException('email');
      } else if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('cpf')
      ) {
        throw new DuplicatedFieldException('cpf');
      }
      throw new Error('Erro ao criar a nova conta');
    }
  }

  async signIn(body: SignInBody): Promise<SignInResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: body.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      });

      if (!user) {
        throw new BadRequestException('Usuário ou senha incorretos');
      }
      const isMatch = await this.passwordService.comparePassword(
        body.password,
        user.password,
      );
      if (!isMatch) {
        throw new BadRequestException('Usuário ou senha incorretos');
      }
      const authToken = await this.authTokenService.generateToken(user.id);
      return {
        auth_token: authToken,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      console.log({ error: error.message });

      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Erro ao fazer login');
      }
    }
  }
}
