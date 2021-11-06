import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthDTO } from './DTO/auth.DTO';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  createUser(@Body(ValidationPipe) authDTO: AuthDTO): Promise<void> {
    return this.AuthService.createUser(authDTO);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authDTO: AuthDTO): Promise<string> {
    return this.AuthService.signIn(authDTO);
  }
}
