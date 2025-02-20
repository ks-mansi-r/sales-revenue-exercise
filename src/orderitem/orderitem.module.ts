import { Module } from '@nestjs/common';
import { OrderItem } from './orderitem.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({

    imports: [TypeOrmModule.forFeature([OrderItem])],
    exports: [TypeOrmModule],
})
export class OrderitemModule {}
