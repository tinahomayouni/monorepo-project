// src/auth/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MakeOfferOnProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '30', description: 'The ID of the product' })
  readonly productId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12.12', description: 'The price of the product' })
  readonly price: string;
}
