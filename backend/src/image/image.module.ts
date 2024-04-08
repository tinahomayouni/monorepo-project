// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Image } from 'src/entity/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../../multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register(multerConfig),
  ],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
