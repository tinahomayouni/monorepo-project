// src/auth/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FlagDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'X Form', description: 'the form about X' })
  readonly flag: string;
}
