import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, UserModule,AuthModule,ProductModule, ConfigModule.forRoot()],
})
export class AppModule {} 
