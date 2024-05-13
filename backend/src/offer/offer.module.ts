// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { Offer } from 'src/entity/offer.entity';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer, Product, User]),
    ProductModule,
    UserModule,
  ],
  providers: [OfferService],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
