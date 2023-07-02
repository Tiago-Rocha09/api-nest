import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../order-repository';
import { OrderReponse } from '../../dtos/order.response';
import { OrderBody } from '../../dtos/order.body';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class OrderRepositoryPrisma implements OrderRepository {
  constructor(private prismaService: PrismaService) {}

  async createOrder(props: OrderBody): Promise<OrderReponse> {
    try {
        const result = await this.prismaService.order.create({
            data: {
                paymentAmount: 
            }
        })
      return {} as OrderReponse;
    } catch (error) {}
  }
}
