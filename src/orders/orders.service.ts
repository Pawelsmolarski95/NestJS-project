import { db, Order } from './../db';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getOrders(): Order[] {
    return db.orders;
  }
  public getOrderById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }
  public deleteOrderById(id: Order['id']) {
    db.orders = db.orders.filter((order) => order.id !== id);
    return { succcess: true };
  }
  public createOrder(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }
  public updateOrderById(id: Order['id'], orderData: Omit<Order, 'id'>) {
    const order = db.orders.find((order) => order.id === id);
    if (order) {
      Object.assign(order, orderData);
    }
  }
}
