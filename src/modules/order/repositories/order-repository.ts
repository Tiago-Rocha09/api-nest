import { UserInHttpHeader } from 'src/shared/dtos';
import { OrderBody } from '../dtos/order.body';
import { OrderReponse, OrderStatusReponse } from '../dtos/order.response';

export abstract class OrderRepository {
  abstract create(
    props: OrderBody,
    user: UserInHttpHeader,
  ): Promise<OrderReponse>;
  abstract getOrderStatus(orderId: number): Promise<OrderStatusReponse>;
}
