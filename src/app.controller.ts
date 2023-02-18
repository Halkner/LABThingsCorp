import { Get } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { Body, Post, Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { ChangePasswordDto } from './users/dto/change-password.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginDto } from './users/dto/login.dto';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService,
    ) {}

  @Post('/auth/register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.register(createUserDto);

      return newUser;
    } catch (error) {
      if (error.code == 23505) {
        throw new HttpException(
          { statusCode: 409, reason: error?.detail, error_code: error?.code },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        { reason: error?.detail, code: error?.code },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/auth/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (!error) {
        throw new UnauthorizedException('Invalid email and/or password');
      }
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/auth/change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Get('/locals')
  async getLocals() {
    return this.usersService.getLocals();
  }
}
