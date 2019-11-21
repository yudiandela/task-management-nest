import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { name, email, username, password } = authCredentialsDto;

    const user = new User();
    user.name = name;
    user.email = email;
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hasPassword(password, user.salt);

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.indexOf('email') >= 0) {
          throw new ConflictException('Email already exists!');
        } else {
          throw new ConflictException('Username already exists!');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hasPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
