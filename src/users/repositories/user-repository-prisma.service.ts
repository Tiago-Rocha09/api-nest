import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserWithoutPassword } from '../dtos/get-user.response';
import { UserRepository } from './user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async getUser(userId: number): Promise<UserWithoutPassword> {
    console.log({ userId });

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
      delete user.password;
      const result = {
        ...user,
        id: Number(user.id),
      };

      console.log({ userGetUser: result });
      return result;
    } catch (error) {
      console.log({ error });
    }
  }
}
