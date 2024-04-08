import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file) {
    return this.imageService.uploadImage(file);
  }

  @Get(':id')
  async serveImage(@Param('id') imageId: number, @Res() res: Response) {
    const image = await this.imageService.serveImage(imageId);

    if (!image) {
      return res.status(404).send('Image not found');
    }

    res.setHeader('Content-Type', image.mimetype);
    res.sendFile(join(__dirname, '../../', 'uploads', image.path));
  }
}
