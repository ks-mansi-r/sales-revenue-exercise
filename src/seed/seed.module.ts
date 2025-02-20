import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';
import { Order } from 'src/order/order.entity';
import { OrderItem } from 'src/orderitem/orderitem.entity';
import { SeedService } from './seed.service';
// import { CustomerSeeder } from './customer.seeder';
// import { OrderSeeder } from './order.seeder';
// import { ProductSeeder } from './product.seeder';
// import { CategorySeeder } from './category.seeder';
@Module({

    imports: [TypeOrmModule.forFeature([Customer, Category, Product, Order, OrderItem])],
    providers: [SeedService],
})
export class SeedModule { }
