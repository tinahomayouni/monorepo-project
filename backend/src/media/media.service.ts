import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entity/media.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async saveMedia(file: Express.Multer.File): Promise<any> {
    const type = file.mimetype.startsWith('image') ? 'image' : 'file';

    if (!file.originalname) {
      throw new Error('Original filename is undefined');
    }

    const media = new Media();
    media.filename = file.originalname;
    media.type = type;

    // Save to database
    const savedMedia = await this.mediaRepository.save(media);

    // Save to local directory
    // const uploadDir = path.join(__dirname, '..', 'uploads');
    // console.log(uploadDir, 'uploadDir');
    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    // const filePath = path.join(
    //   uploadDir,
    //   savedMedia.id + '-' + savedMedia.filename,
    // );
    // fs.writeFileSync(filePath, file.buffer);

    // Determine the upload directory path
    const projectRoot = path.join(__dirname, '..', '..', '..', '..'); // Assuming src is 4 levels deep from project root

    const uploadDir = path.join(projectRoot, 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Construct the file path

    const filePath = path.join(
      uploadDir,
      savedMedia.id + '-' + savedMedia.filename,
    );
    fs.writeFileSync(filePath, file.buffer);

    return {
      id: savedMedia.id,
      filename: savedMedia.filename,
      type: savedMedia.type,
      filePath: filePath,
    };
  }
}
