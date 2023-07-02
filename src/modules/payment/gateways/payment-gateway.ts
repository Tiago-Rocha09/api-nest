import { FormattedGatewayResponse } from '../dtos/gateway-response';
import { PaymentPix, PaymentPixProps } from '../dtos/payment-pix';

export abstract class PaymentRepository {
  abstract generatePixPaymentRequestBody(props: PaymentPixProps): PaymentPix;
  abstract createPixPayment(
    body: PaymentPix,
  ): Promise<FormattedGatewayResponse>;
}
