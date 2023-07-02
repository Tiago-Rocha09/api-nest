import { Injectable } from '@nestjs/common';
import { OrderRepository } from './repositories/order-repository';
import { OrderReponse, OrderStatusReponse } from './dtos/order.response';
import { OrderBody } from './dtos/order.body';
import { UserInHttpHeader } from 'src/shared/dtos';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(body: OrderBody, user: UserInHttpHeader): Promise<OrderReponse> {
    return this.orderRepository.create(body, user);
  }

  async getOrderStatus(orderId: string): Promise<OrderStatusReponse> {
    return this.orderRepository.getOrderStatus(Number(orderId));
  }
}
