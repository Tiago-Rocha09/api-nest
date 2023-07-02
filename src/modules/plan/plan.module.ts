import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanRepository } from './repositories/plan-repository';
import { PlanRepositoryPrisma } from './repositories/implementations/plan-repository-prisma.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    PlanService,
    {
      provide: PlanRepository,
      useClass: PlanRepositoryPrisma,
    },
  ],
})
export class PlanModule {}
