import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from 'src/order/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
    constructor(private readonly dataSource: DataSource) {
        super(Order, dataSource.createEntityManager());
    }


    //Get Total Revenue by Month (Current Year)

    public async getTotalRevenueByMonth() {
        return this.createQueryBuilder('order')
            .select(`TO_CHAR(order.createdAt, 'YYYY-MM') AS month`)
            .addSelect('SUM(order.totalAmount)', 'total_revenue')
            .where('EXTRACT(YEAR FROM order.createdAt) = EXTRACT(YEAR FROM CURRENT_DATE)')
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
    }

    //Get top 5 customers spending as completed
    public async getTop5CustomersBySpending() {
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

    // Get sales & revenue per product& category
    public async getSalesAndRevenuePerCategory() {
        return this.dataSource
            .createQueryBuilder()
            .select('category.id', 'category_id')
            .addSelect('category.name', 'category_name')
            .addSelect('COUNT(order_item.id)', 'total_products_sold')
            .addSelect('SUM(order_item.price)', 'total_revenue')
            .from('order_items', 'order_item')
            .innerJoin('products', 'product', 'order_item.productId = product.id')
            .innerJoin('categories', 'category', 'product.categoryId = category.id')
            .groupBy('category.id, category.name')
            .orderBy('total_revenue', 'DESC')
            .getRawMany();
    }


    //Get daily order count last 7 days 
    public async getDailyOrderFromLast7Days() {
        return this.createQueryBuilder('order')
            .select('COUNT(order.id)', 'order_count')
            .addSelect(`TO_CHAR(order.createdAt, 'YYYY-MM-DD') AS order_date`)
            .addSelect('COUNT(order.id)', 'order_count')
            .where('order.createdAt >= CURRENT_DATE - INTERVAL \'7 days\'')
            .groupBy('order_date')
            .orderBy('order_date', 'ASC')
            .getRawMany();
    }


}
