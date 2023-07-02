import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../payment-gateway';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { PaymentPix, PaymentPixProps } from '../../dtos/payment-pix';
import {
  FormattedGatewayResponse,
  GatewayResponse,
} from '../../dtos/gateway-response';

@Injectable()
export class PaymentRepositoryDippi implements PaymentRepository {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  generatePixPaymentRequestBody(props: PaymentPixProps): PaymentPix {
    try {
      return {
        MerchantOrderId: props.orderId,
        Customer: {
          Name: props.customer?.name,
          Email: props.customer?.email,
          Identity: props.customer?.cpf,
          IdentityType: 0,
        },
        Payment: {
          PayerMessage: 'API Nest',
          Type: 'Pix',
          Amount: Number((props.total * 100).toFixed(0)),
          UrlReturn: `https://webhook.site/494eb771-7c1e-405b-aaa6-4b7d3ce72533`,
          ExpirationTime: 900,
          AdditionalInfo: [
            {
              Name: 'Ingresso comprado na',
              Value: 'API Nest Teste',
            },
          ],
        },
      };
    } catch (error) {
      return null;
    }
  }

  async createPixPayment(body: PaymentPix): Promise<FormattedGatewayResponse> {
    const observable = this.httpService
      .post<GatewayResponse>(
        `${this.config.get('DIPPI_API_URL')}/payments/create-immediate`,
        body,
        {
          headers: {
            MerchantId: this.config.get('DIPPI_MERCHANT_ID'),
            MerchantKey: this.config.get('DIPPI_MERCHANT_KEY'),
          },
        },
      )
      .pipe(
        map((response) => {
          console.log('then');
          console.log({ responseData: response.data });
          if (response?.data) {
            const data = response.data;
            return {
              orderId: Number(data.MerchantOrderId),
              paymentStatusDescription: data.PaymentReturnMessage,
              transactionId: data.TransactionId,
              expiresAt: data.PaymentExpirationDateTime,
              qrCode: data.PaymentQrCodeString,
              qrCodeUrl: data.PaymentQrCodeBase64Image,
              line: data.PaymentBarCodeNumber,
              createdAt: data.created_at,
              status: data.PaymentStatus,
              statusCode: response.status,
            };
          }
        }),
        catchError((error) => {
          console.log('catch');
          console.log({ response: error.response });
          console.log({ responseData: error.response.data });
          const data = error?.response?.data;
          return of({
            orderId: Number(data?.MerchantOrderId),
            paymentStatusDescription: data?.PaymentReturnMessage,
            transactionId: data?.TransactionId,
            expiresAt: data?.PaymentExpirationDateTime,
            qrCode: data?.PaymentQrCodeString,
            qrCodeUrl: data?.PaymentQrCodeBase64Image,
            line: data?.PaymentBarCodeNumber,
            createdAt: data?.created_at,
            status: data?.PaymentStatus,
            statusCode: error.response.status,
          });
        }),
      );

    const data = await lastValueFrom(observable);
    console.log({ dataHere: data });

    return data;
  }
}
