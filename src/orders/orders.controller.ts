import { Controller, Get } from '@nestjs/common';
import { OrderService } from './service/orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('revenue-by-month')
  public getTotalRevenueByMonth() {
    return this.orderService.getTotalRevenueByMonth();
  }

  @Get('top-5-customers')
  getTop5CustomersBySpending() {
    return this.orderService.getTop5CustomersBySpending();
  }


  @Get('sales-revenue-product')
  getSalesCountAndRevenuePerCategory() {
    return this.orderService.getSalesAndRevenuePerCategory();
  }


  //get  daily order from last 7 days
  @Get('daily-order-last-7days')
  async getDailyOrderFRomLast7Days(){

    return this. orderService.getDailyOrderFromLast7Days();
  }

  @Get('avg-order-customer')
  async getAvgOrderValueCustomer(){
    return this.orderService.getAvgOrderValueCustomer();
  }
}
