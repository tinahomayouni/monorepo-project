import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ProductModule, OfferModule, ConfigModule.forRoot()],
})
export class AppModule {} 
