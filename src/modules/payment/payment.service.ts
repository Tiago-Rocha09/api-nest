import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './gateways/payment-gateway';
import { FormattedGatewayResponse } from './dtos/gateway-response';
import { PaymentPixProps } from './dtos/payment-pix';

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async createPixPayment(
    props: PaymentPixProps,
  ): Promise<FormattedGatewayResponse> {
    try {
      console.log({ props });

      const paymentBody =
        this.paymentRepository.generatePixPaymentRequestBody(props);

      if (!paymentBody) {
        return null;
      }

      const gatewayResponse = await this.paymentRepository.createPixPayment(
        paymentBody,
      );

      return gatewayResponse;
    } catch (error) {
      console.log({ errorMesddddsage: error.message });

      return null;
    }
  }
}
