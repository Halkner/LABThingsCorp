import { HttpStatus } from '@nestjs/common/enums';
import { Controller, Req, Body } from '@nestjs/common';
import { Get, Put, Request, Param } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthService } from 'src/core/auth/auth.service';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('/:id')
  async findOne(@Request() request) {
    try {
      return await this.usersService.findOne(request.user);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const response = await this.usersService.update(userId, updateUserDto);

      return { message: 'user updated successfully', user: response };
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  
}
