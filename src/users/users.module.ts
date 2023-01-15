import { databaseProviders } from './../core/database/database.providers';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { AuthService } from 'src/core/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    ...databaseProviders,
    ...userProviders,
    AuthService,
    JwtService,
    UsersService,
  ],
})
export class UsersModule {}
