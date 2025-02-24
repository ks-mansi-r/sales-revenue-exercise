import { Module } from '@nestjs/common';
import { OrderService } from './service/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/order.entity';
import { OrderRepository } from './repository/order.repository';
import { OrderController } from './orders.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Order])],

  providers: [OrderService, OrderRepository],

  controllers: [OrderController],
  exports:[OrderRepository]
})
export class OrdersModule {}
