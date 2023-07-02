import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderRepository } from '../order-repository';
import { OrderReponse, OrderStatusReponse } from '../../dtos/order.response';
import { OrderBody } from '../../dtos/order.body';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PlanService } from 'src/modules/plan/plan.service';
import { UserInHttpHeader } from 'src/shared/dtos';
import { PaymentService } from 'src/modules/payment/payment.service';
import { PaymentPixProps } from 'src/modules/payment/dtos/payment-pix';

@Injectable()
export class OrderRepositoryPrisma implements OrderRepository {
  constructor(
    private prismaService: PrismaService,
    private planService: PlanService,
    private paymentService: PaymentService,
  ) {}

  async getOrderStatus(orderId: number): Promise<OrderStatusReponse> {
    try {
      const order = await this.prismaService.order.findUnique({
        select: {
          id: true,
          status: true,
        },
        where: {
          id: orderId,
        },
      });

      if (!order) {
        throw new BadRequestException(
          'Não foi possível verificar o status da ordem no momento',
        );
      }

      return {
        orderId: Number(order.id),
        status: order.status,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Erro ao buscar o status da ordem',
        );
      }
    }
  }

  async create(
    props: OrderBody,
    user: UserInHttpHeader,
  ): Promise<OrderReponse> {
    try {
      const plan = await this.planService.findOne(props.planId);
      console.log({ plan });

      if (!plan) {
        throw new BadRequestException(
          'Não foi possível identificar o plano que você selecionou',
        );
      }

      const result = await this.prismaService.order.create({
        data: {
          paymentAmount: plan.value,
          paymentType: 'pix',
          planId: plan.id,
          status: 12,
          statusText: 'Pendente',
          userId: Number(user.id),
        },
        select: {
          id: true,
        },
      });

      const paymentPixProps: PaymentPixProps = {
        customer: {
          cpf: props.customerCpf,
          email: props.customerEmail,
          name: props.customerName,
        },
        orderId: Number(result.id),
        paymentType: 'Pix',
        total: plan.value,
      };

      const paymentResponse = await this.paymentService.createPixPayment(
        paymentPixProps,
      );
      console.log({ paymentResponse });

      if (paymentResponse?.statusCode === 201) {
        if (paymentResponse.transactionId) {
          await this.prismaService.order.update({
            data: {
              transactionId: paymentResponse.transactionId.toString(),
            },
            where: {
              id: paymentResponse.orderId,
            },
          });
        }
        return paymentResponse;
      }
      throw new BadRequestException('Não foi possível gerar o pix no momento');
    } catch (error) {
      console.log({ errorMessage: error.message });

      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Erro ao buscar o plano');
      }
    }
  }
}
