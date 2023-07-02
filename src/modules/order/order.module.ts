import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repositories/order-repository';
import { OrderRepositoryPrisma } from './repositories/implamantations/order-repository-prisma.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PlanRepository } from '../plan/repositories/plan-repository';
import { PlanRepositoryPrisma } from '../plan/repositories/implementations/plan-repository-prisma.service';
import { PlanService } from '../plan/plan.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../payment/payment.service';
import { PaymentRepository } from '../payment/gateways/payment-gateway';
import { PaymentRepositoryDippi } from '../payment/gateways/implemantations/create-payment-dippi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    JwtService,
    PlanService,
    ConfigService,
    PaymentService,
    {
      provide: OrderRepository,
      useClass: OrderRepositoryPrisma,
    },
    {
      provide: PlanRepository,
      useClass: PlanRepositoryPrisma,
    },
    {
      provide: PaymentRepository,
      useClass: PaymentRepositoryDippi,
    },
  ],
})
export class OrderModule {}
