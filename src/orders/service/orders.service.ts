import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/order.entity';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async getTotalRevenueByMonth() {
    return this.orderRepository.getTotalRevenueByMonth();
  }


  public async getTop5CustomersBySpending(){
    return this.orderRepository.getTop5CustomersBySpending();
  }

  public async getSalesAndRevenuePerCategory(){
    return this.orderRepository.getSalesAndRevenuePerCategory();
  }

  public async getDailyOrderFromLast7Days(){
    return this.orderRepository.getDailyOrderFromLast7Days();
  }
  
  public async getAvgOrderValueCustomer(){
    return this.orderRepository.getAvgOrderValueCustomer();
  }
}
