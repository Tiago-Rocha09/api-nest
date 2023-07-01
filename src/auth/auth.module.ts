import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaAuthRepository } from './repositories/implementations/auth-repository-prisma.service';
import { AuthRepository } from './repositories/auth-repository';
import { PasswordService } from './utils/password.service';
import { PasswordServiceBcrypt } from './utils/implementations/password-bcrypt.service';
import { AuthTokenService } from './utils/auth-token.service';
import { AuthTokenJwtService } from './utils/implementations/auth-token-jwt.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtService,
    ConfigService,
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
    {
      provide: PasswordService,
      useClass: PasswordServiceBcrypt,
    },
    {
      provide: AuthTokenService,
      useClass: AuthTokenJwtService,
    },
  ],
})
export class AuthModule {}
