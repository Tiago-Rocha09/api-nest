export class FormattedGatewayResponse {
  orderId: number;
  paymentStatusDescription: string;
  transactionId: number;
  expiresAt: string;
  qrCode: string;
  qrCodeUrl: string;
  line: string;
  createdAt: string;
  status: number;
  statusCode: number;
}

export class GatewayResponse {
  MerchantOrderId: string;
  PaymentReturnMessage: string;
  TransactionId: number;
  PaymentExpirationDateTime: string;
  PaymentQrCodeString: string;
  PaymentQrCodeBase64Image: string;
  PaymentBarCodeNumber: string;
  created_at: string;
  PaymentStatus: number;
}
