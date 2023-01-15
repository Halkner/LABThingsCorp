import { ValidationPipe } from '@nestjs/common/pipes';
import { Body, Post, Controller } from '@nestjs/common';
import { AuthService } from "./core/auth/auth.service";
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './users/dto/login.dto';

@Controller()
export class AppController {
  constructor(
        private readonly authService: AuthService
    ) {}

  @Post('/auth/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
      await this.authService.create(createUserDto);
      return { message: 'User created successfully' };
  }

  @Post('/auth/login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
      return await this.authService.login(loginDto);
  }


}