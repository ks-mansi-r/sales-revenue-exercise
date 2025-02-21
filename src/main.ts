import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DatabaseSeeder } from './seed/seed.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const seeder = app.get(DatabaseSeeder);
  // await seeder.seed();
  await app.listen(3000);
}
bootstrap();

