import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  async register(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return await this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.login(authCredentialsDto);
  }
}
