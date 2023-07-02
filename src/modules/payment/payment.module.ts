import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentRepository } from './gateways/payment-gateway';
import { PaymentRepositoryDippi } from './gateways/implemantations/create-payment-dippi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    PaymentService,
    {
      provide: PaymentRepository,
      useClass: PaymentRepositoryDippi,
    },
  ],
})
export class PaymentModule {}
