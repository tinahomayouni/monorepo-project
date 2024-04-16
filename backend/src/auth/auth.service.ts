import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserReqLoginDto } from './dto/user.request.login.dto';
import { UserService } from 'src/user/user.service';
import { BcryptService } from './bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
  ) {}

  async googleSignUp(googleUser: any) {
    const { email, name } = googleUser;
    let user = await this.userService.findByUsername(email);
    if (!user) {
      const password = '';

      user = await this.userService.createUser(email, password);
    }
    user.username = name;
    return this.userService.create(user);
  }
  async signUp(userRequestLoginDto: UserReqLoginDto) {
    const { username, password } = userRequestLoginDto;
    const hashedPassword = await this.bcryptService.hashPassword(password);
    return this.userService.createUser(username, hashedPassword);
  }
  async login(userReqLoginDto: UserReqLoginDto): Promise<{
    accessToken: string;
    username: string;
  }> {
    try {
      const { username, password } = userReqLoginDto;

      const user = await this.userService.findByUsername(username);
      const hashedPassword = await bcrypt.hash(user.password, 10);

      if (user.username) {
        const hashedPassword = await bcrypt.compare(password, user.password);

        if (hashedPassword) {
          const payload = {
            username: user.username,
          };

          const accessToken = this.jwtService.sign(payload);
          return {
            accessToken,
            username: user.username,
          };
        }
      }

      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid username or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Login failed',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
