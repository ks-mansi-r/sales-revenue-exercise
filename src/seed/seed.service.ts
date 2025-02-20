
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';
import { Order, OrderStatus } from 'src/order/order.entity';
import { OrderItem } from 'src/orderitem/orderitem.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    console.log('Seeding started...');
    
    // await this.seedCustomers();
    // await this.seedCategories();
    // await this.seedProducts();
    await this.seedOrders();

    console.log('Seeding completed.');
  }

  // private async seedCustomers() {
  //   const customers: Partial<Customer>[] = [];
  //   for (let i = 0; i < 5000; i++) {
  //     customers.push({
  //       name: faker.person.fullName(),
  //       email: faker.internet.email(),
  //       createdAt: faker.date.past(),
  //     });
  //   }
  //   await this.dataSource.getRepository(Customer).save(customers);
  //   console.log('Seeded 5000 Customers');
  // }

  // private async seedCategories() {
  //   const categoryRepository = this.dataSource.getRepository(Category);
  //   const existingCategories = await categoryRepository.count();
  
  //   if (existingCategories > 0) {
  //     console.log('Categories already exist. Skipping seeding.');
  //     return;
  //   }
  
  //   const categories: Partial<Category>[] = [];
  //   for (let i = 0; i < 100; i++) {
  //     categories.push({ Name: faker.commerce.department() });
  //   }
  
  //   await categoryRepository.save(categories);
  //   console.log('Seeded 100 Categories');
  // }
  


  // private async seedProducts() {
  //   const categories = await this.dataSource.getRepository(Category).find();
  //   const products: Partial<Product>[] = [];
  //   for (let i = 0; i < 1000; i++) {
  //     products.push({
  //       name: faker.commerce.productName(),
  //       price: parseFloat(faker.commerce.price()),
  //       category: categories[Math.floor(Math.random() * categories.length)],
  //     });
  //   }
  //   await this.dataSource.getRepository(Product).save(products);
  //   console.log('Seeded 1000 Products');
  // }

  private async seedOrders() {
    const customers = await this.dataSource.getRepository(Customer).find();
    const products = await this.dataSource.getRepository(Product).find();
  
    let ordersToInsert: Partial<Order>[] = [];
    let orderItemsToInsert: Partial<OrderItem>[] = [];
  
    for (let i = 0; i < 400000; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
  
      ordersToInsert.push({
        customer,
        totalAmount: 0,
        status: faker.helpers.arrayElement([OrderStatus.PENDING, OrderStatus.COMPLETED, OrderStatus.CANCELLED]),
        createdAt: faker.date.past(),
      });
  
      // Bulk insert in batches
      if (ordersToInsert.length >= 5000) {
        const savedOrders = await this.dataSource.getRepository(Order).save(ordersToInsert);
        
        savedOrders.forEach((savedOrder, index) => {
          let orderTotal = 0;
          let orderItems: Partial<OrderItem>[] = [];
  
          for (let j = 0; j < Math.floor(Math.random() * 3) + 3; j++) {
            const product = products[Math.floor(Math.random() * products.length)];
            const quantity = Math.floor(Math.random() * 5) + 1;
            const price = product.price * quantity;
  
            orderItems.push({
              order: savedOrder, 
              product,
              quantity,
              price,
            });
  
            orderTotal += price;
          }
  
          savedOrders[index].totalAmount = orderTotal;
          orderItemsToInsert.push(...orderItems);
        });
  
        await this.dataSource.getRepository(Order).save(savedOrders); 
        await this.dataSource.getRepository(OrderItem).save(orderItemsToInsert);
        
        ordersToInsert = [];
        orderItemsToInsert = [];
        console.log(`Inserted ${i + 1} orders`);
      }
    }
  
    console.log('Seeded 400,000 Orders');
  }
  


}
