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
  async getOrders() {
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
    this.orderService.createOrder(orderData);
    return { success: true };
  }
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateOrderDTO,
  ) {
    if (!(await this.orderService.getOrderById(id)))
      throw new NotFoundException('Order not found');

    await this.orderService.updateOrderById(id, productData);
    return { success: true };
  }
}
