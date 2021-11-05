import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './DTO/auth.DTO';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/signup')
  createUser(@Body(ValidationPipe) authDTO: AuthDTO): Promise<void> {
    return this.AuthService.createUser(authDTO);
  }
}
