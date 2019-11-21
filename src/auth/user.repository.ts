import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();

    return user;
  }
}
