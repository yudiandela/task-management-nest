import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return await this.authService.register(authCredentialsDto);
  }
}
