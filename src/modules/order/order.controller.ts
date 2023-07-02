import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderBody } from './dtos/order.body';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/shared/dtos';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: OrderBody, @Req() req: RequestWithUser) {
    return this.orderService.create(body, req.user);
  }

  @UseGuards(AuthGuard)
  @Get(':id/status')
  getOrderStatus(@Param('id') orderId: string) {
    return this.orderService.getOrderStatus(orderId);
  }
}
