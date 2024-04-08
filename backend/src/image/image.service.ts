import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entity/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const newImage = new Image();
    newImage.filename = file.originalname;
    newImage.mimetype = file.mimetype;
    newImage.path = file.filename;

    return await this.imageRepository.save(newImage);
  }
  async serveImage(imageId: number): Promise<Image> {
    return await this.imageRepository.findOne({ where: { id: imageId } });
  }
}
