import { HttpStatus } from '@nestjs/common/enums';
import { Controller, Body } from '@nestjs/common';
import { Get, Put, Request, Param } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found.', type: Users })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('/:id')
  async findOne(@Request() request) {
    try {
      return await this.usersService.findOne(request.user);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated.', type: Users })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
