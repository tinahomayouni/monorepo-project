import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserReqLoginDto } from './dto/user.request.login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(userReqLoginDto: UserReqLoginDto): Promise<{
    accessToken: string;
    username: string;
  }> {
    try {
      const { username, password } = userReqLoginDto;

      // Find the user by username
      const user = await this.userService.findByUsername(username);
      console.log(user, 'user');
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log(hashedPassword, 'hashedPassword');

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

      // If the user does not exist or the password is incorrect, throw an error
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
