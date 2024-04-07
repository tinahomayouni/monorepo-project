import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule,AuthModule, ConfigModule.forRoot()],
})
export class AppModule {}
