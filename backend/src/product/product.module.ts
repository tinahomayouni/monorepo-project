// product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/entity/product.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/entity/user.entity';
import { Offer } from 'src/entity/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Offer]), UserModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
