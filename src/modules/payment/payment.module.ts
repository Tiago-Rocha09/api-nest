import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentRepository } from './gateways/payment-gateway';
import { PaymentRepositoryDippi } from './gateways/implemantations/create-payment-dippi.service';

@Module({
  imports: [HttpModule],
  providers: [
    PaymentService,
    {
      provide: PaymentRepository,
      useClass: PaymentRepositoryDippi,
    },
  ],
})
export class PaymentModule {}
