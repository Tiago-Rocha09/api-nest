import { OrderBody } from '../dtos/order.body';
import { OrderReponse } from '../dtos/order.response';

export abstract class OrderRepository {
  abstract createOrder(props: OrderBody): Promise<OrderReponse>;
}
