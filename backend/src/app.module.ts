import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OfferModule } from './offer/offer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the config module global
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    OfferModule,
    MediaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
})
export class AppModule {}
