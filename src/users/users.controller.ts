import { ApiOperation } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from './../core/auth/guards/jwt-auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ApiResponse } from '@nestjs/swagger/dist/decorators';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @ApiOperation({summary: 'Get user profile'})
    @ApiResponse({status: 200, description: 'User profile retrieved successfully'})
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getUserProfile(@Req() req): Promise<User> {
        const userId = req.user.id;
        return await this.usersService.getUserProfile(userId);
    }
}
