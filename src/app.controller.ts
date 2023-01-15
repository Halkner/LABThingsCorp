import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { Body, Post, Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from "./core/auth/auth.service";
import { ChangePasswordDto } from './users/dto/change-password.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './users/dto/login.dto';

@Controller()
export class AppController {
  constructor(
        private readonly authService: AuthService
    ) {}

  @Post('/auth/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
      await this.authService.create(createUserDto);
      return { message: 'User created successfully' };
  }

  @Post('/auth/login')
  async login(@Body() loginDto: LoginDto) {
      return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/auth/change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}