import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repostitory';
import { AuthDTO } from './DTO/auth.DTO';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  createUser(authDTO: AuthDTO): Promise<void> {
    return this.userRepository.createUser(authDTO);
  }
}
