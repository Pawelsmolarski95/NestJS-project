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
    
  }
  @Get('/')
  getOrders() {
    return this.orderService.getOrders();
  }
  
  @Get('/:id')
  async geOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.orderService.getOrderById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
  
  @Delete('/:id')
  async deleteOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.orderService.getOrderById(id)))
    throw new NotFoundException('Product not found');
  await this.orderService.deleteOrderById(id);
  return { success: true };
  }

  @Post('/')
  createOrder(@Body() orderData: CreateOrderDTO) {
    return this.orderService.createOrder(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.orderService.getOrderById(id)))
      throw new NotFoundException('Order not found');

    await this.orderService.updateOrderById(id, orderData);
    return { success: true };
  }
}
