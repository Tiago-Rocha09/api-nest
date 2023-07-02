import { Injectable } from '@nestjs/common';
import { PlanRepository } from './repositories/plan-repository';
import { Plan } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private planRepository: PlanRepository) {}

  findOne(planId: number): Promise<Plan> {
    return this.planRepository.findOne(planId);
  }
}
