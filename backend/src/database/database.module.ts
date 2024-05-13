// database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/entity/user.entity';
import { Product } from 'src/entity/product.entity';
import { Offer } from 'src/entity/offer.entity';
import { Media } from 'src/entity/media.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Product, Offer, Media],
      synchronize: true, // Don't use in production, it drops the database schema and recreates it
    }),
  ],
})
export class DatabaseModule {}
