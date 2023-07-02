export class OrderReponse {
  orderId: number;
  qrCode: string;
  qrCodeUrl: string;
}

export class OrderStatusReponse {
  orderId: number;
  status: number;
}
