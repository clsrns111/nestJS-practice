import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDTO } from './DTO/auth.DTO';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authDTO: AuthDTO): Promise<void> {
    const { name, password } = authDTO;
    const user = this.create({ name, password });
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
}
