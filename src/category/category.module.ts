import { Module } from '@nestjs/common';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

    imports: [TypeOrmModule.forFeature([Category])],
    exports: [TypeOrmModule],
})
export class CategoryModule { }
