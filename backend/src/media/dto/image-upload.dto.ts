// image-upload.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';

export class ImageUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary', // Specify the format as 'binary' for file upload
    example: 'sample-image.jpg',
    description: 'The image file to upload',
  })
  @IsNotEmpty()
  file: Express.Multer.File;
}
