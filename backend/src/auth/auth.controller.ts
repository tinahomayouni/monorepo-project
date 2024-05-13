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

  @Post('google-sign-up')
  async googleSignUp(@Body() googleUser: any) {
    try {
      const result = await this.authService.googleSignUp(googleUser);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('sign-up')
  async signUp(@Body() userRequestLoginDto: UserReqLoginDto) {
    try {
      const result = await this.authService.signUp(userRequestLoginDto);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

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
