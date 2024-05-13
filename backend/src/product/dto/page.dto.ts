import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { User } from 'src/entity/user.entity';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  @ApiProperty({ type: () => PageMetaDto })
  readonly user?: string;

  constructor(data: T[], meta: PageMetaDto, user: User) {
    this.data = data;
    this.meta = meta;
    this.user = String(user.id);
  }
}
