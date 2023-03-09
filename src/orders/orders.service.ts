import { db, Order } from './../db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    public getOrders(): Order[] {
        return db.orders;
    }
    public getOrderById(id: Order['id']): Order | null {
        return db.orders.find(order => order.id === id);
    }
}
