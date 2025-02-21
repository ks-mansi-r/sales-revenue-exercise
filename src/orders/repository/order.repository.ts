import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from 'src/order/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
    constructor(private readonly dataSource: DataSource) {
        super(Order, dataSource.createEntityManager());
    }


    //Get Total Revenue by Month (Current Year)

    async getTotalRevenueByMonth() {
        return this.createQueryBuilder('order')
            .select(`TO_CHAR(order.createdAt, 'YYYY-MM') AS month`)
            .addSelect('SUM(order.totalAmount)', 'total_revenue')
            .where('EXTRACT(YEAR FROM order.createdAt) = EXTRACT(YEAR FROM CURRENT_DATE)')
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
    }

    async getTop5CustomersBySpending() {
        return this.createQueryBuilder('order')
          .select('customer.id', 'customer_id')
          .addSelect('customer.name', 'customer_name')
          .addSelect('SUM(order.totalAmount)', 'total_spent')
          .innerJoin('order.customer', 'customer')
          .where('order.status = :status', { status: 'completed' })
          .groupBy('customer.id, customer.name')
          .orderBy('total_spent', 'DESC')
          .limit(5)
          .getRawMany();
      }

      async 

}
