import { Module } from '@nestjs/common';
import { Customer } from './customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({

    imports: [TypeOrmModule.forFeature([Customer])],
    exports: [TypeOrmModule],
})
export class CustomerModule {}
