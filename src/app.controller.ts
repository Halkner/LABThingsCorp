import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { Body, Post, Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { ChangePasswordDto } from './users/dto/change-password.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './users/dto/login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Create a user',
    description:
      'Create a user with a username and password. Returns a JWT token to be used for authentication.',
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post('/auth/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.authService.create(createUserDto);
    return { message: 'User created successfully' };
  }

  @ApiOperation({
    summary: 'Login',
    description:
      'Login with a username and password. Returns a JWT token to be used for authentication.',
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @Post('/auth/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Change password',
    description:
      'Change password for a user. Returns a JWT token to be used for authentication.',
  })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @UseGuards(JwtAuthGuard)
  @Patch('/auth/change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
