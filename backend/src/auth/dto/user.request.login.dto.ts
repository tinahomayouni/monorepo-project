// src/auth/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin', description: 'The username of the user' })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1234567',
    description: 'The password of the user',
  })
  readonly password: string;
}
