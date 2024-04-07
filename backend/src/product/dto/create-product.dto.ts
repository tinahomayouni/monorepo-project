// src/auth/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'product', description: 'The name of the product' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12.12', description: 'The price of the product' })
  readonly price: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'description',
    description: 'The description of the product',
  })
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'images',
    description: 'The images of the product',
  })
  readonly images: string[];
}
