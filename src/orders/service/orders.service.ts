import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/order.entity';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  getTotalRevenueByMonth() {
    return this.orderRepository.getTotalRevenueByMonth();
  }

  
}
