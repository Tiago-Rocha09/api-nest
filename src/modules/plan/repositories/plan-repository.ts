import { Plan } from '@prisma/client';

export abstract class PlanRepository {
  abstract findOne(planId: number): Promise<Plan>;
}
