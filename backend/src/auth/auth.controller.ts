// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserReqLoginDto } from './dto/user.request.login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userRequestLoginDto: UserReqLoginDto) {
    try {
      const result = await this.authService.login(userRequestLoginDto);
      return {
        message: 'User logged in successfully',
        result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid username or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
