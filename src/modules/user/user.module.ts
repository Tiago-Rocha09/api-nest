import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './repositories/user-repository';
import { UserRepositoryPrisma } from './repositories/user-repository-prisma.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [
    UsersService,
    JwtService,
    ConfigService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
