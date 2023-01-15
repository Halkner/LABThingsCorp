import { Body, Post, Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from "./core/auth/auth.service";
import { ChangePasswordDto } from './users/dto/change-password.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './users/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Patch('/auth/change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}