import { Controller, Get } from '@nestjs/common';
import { OrderService } from './service/orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('revenue-by-month')
  public getTotalRevenueByMonth() {
    return this.orderService.getTotalRevenueByMonth();
  }

}
