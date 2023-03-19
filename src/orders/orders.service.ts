import { Order } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }

  public getOrderById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true },
    });
  }
  public deleteOrderById(id: Order['id']): Promise<Order> {
    {
      return this.prismaService.order.delete({ where: { id } });
    }
  }

  public async createOrder(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { clientId, productId} = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }

  public updateOrderById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { clientId, productId,  } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
    });
  }
}
