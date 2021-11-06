import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDTO } from './DTO/auth.DTO';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authDTO: AuthDTO): Promise<void> {
    const { name, password } = authDTO;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = this.create({ name, password: hash });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 23505) {
        throw new ConflictException('해당 아이디가 이미 존재합니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authDTO: AuthDTO): Promise<string> {
    const { name, password } = authDTO;
    const user = await this.findOne({ name });

    console.log(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login Success';
    } else {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  }
}
