import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService]
})
export class OrdersModule {}
