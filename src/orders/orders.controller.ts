import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {
        this.orderService = orderService;
    }
    @Get('/')
    getOrders():any {
        return this.orderService.getOrders();
    }
    @Get('/:id')
    getOrder(@Param('id') id:string):any {
        return this.orderService.getOrderById(id);
    }
}
