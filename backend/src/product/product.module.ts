// product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Offer } from 'src/entity/offer.entity';
import { OfferModule } from 'src/offer/offer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User]), UserModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
