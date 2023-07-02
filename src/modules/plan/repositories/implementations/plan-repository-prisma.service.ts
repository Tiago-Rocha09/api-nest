import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PlanRepository } from '../plan-repository';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Plan } from '@prisma/client';

@Injectable()
export class PlanRepositoryPrisma implements PlanRepository {
  constructor(private prismaService: PrismaService) {}

  findOne(planId: number): Promise<Plan> {
    try {
      const plan = this.prismaService.plan.findUnique({
        where: {
          id: planId,
        },
      });

      return plan;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Erro ao buscar o plano');
      }
    }
  }
}
