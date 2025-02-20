import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { OrderitemModule } from './orderitem/orderitem.module';
import { Customer } from './customer/customer.entity';
import { Product } from './product/product.entity';
import { Order } from './order/order.entity';
import { OrderItem } from './orderitem/orderitem.entity';
import { Category } from './category/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
@Module({
  imports: [CustomerModule, ProductModule, OrderModule, CategoryModule, OrderitemModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'sales-revenue-2',
      entities: [Customer, Order, OrderItem,Product, Category],
      synchronize: true,
      autoLoadEntities: true,
      
    }),

    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
