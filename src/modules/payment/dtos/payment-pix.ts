import { PaymentPixCustomerProps } from './payment-customer';
import { PaymentShared } from './payment-shared';

class AdditionalInfoPix {
  Name: string;
  Value: string;
}

class PaymentProps {
  PayerMessage: string;
  Type: 'Pix';
  Amount: number;
  UrlReturn: string;
  ExpirationTime: number;
  AdditionalInfo: AdditionalInfoPix[];
}

export class PaymentPix extends PaymentShared {
  Payment: PaymentProps;
}

export class PaymentPixProps {
  paymentType: 'Pix';
  orderId: number;
  total: number;
  customer: PaymentPixCustomerProps;
}
