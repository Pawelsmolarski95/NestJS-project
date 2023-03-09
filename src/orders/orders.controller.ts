import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Delete,
  Post,
  Body,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {
    this.orderService = orderService;
  }
  @Get('/')
  getOrders(): any {
    return this.orderService.getOrders();
  }
  @Get('/:id')
  getOrder(@Param('id') id: string): any {
    const findOrder = this.orderService.getOrderById(id);
    if (!findOrder) throw new NotFoundException('Order not found');
    return this.orderService.getOrderById(id);
  }
  @Delete('/:id')
  deleteOrderById(@Param('id') id: string): any {
    const findOrder = this.orderService.getOrderById(id);
    if (!findOrder) throw new NotFoundException('Order not found');
    return this.orderService.deleteOrderById(id);
  }
  @Post('/')
  createOrder(@Body() orderData: CreateOrderDTO) {
    this.orderService.createOrder(orderData);
    return { success: true };
  }
  @Put('/:id')
  updateOrderById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    const findOrder = this.orderService.getOrderById(id);
    if (!findOrder) throw new NotFoundException('Product not found');
    this.orderService.updateOrderById(id, orderData);
    return { success: true };
  }
}
