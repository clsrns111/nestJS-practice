import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repostitory';
import { AuthDTO } from './DTO/auth.DTO';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  createUser(authDTO: AuthDTO): Promise<void> {
    return this.userRepository.createUser(authDTO);
  }

  signIn(authDTO: AuthDTO): Promise<string> {
    console.log(authDTO);
    return this.userRepository.signIn(authDTO);
  }
}
