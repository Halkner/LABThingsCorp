import { databaseProviders } from './../core/database/database.providers';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { AuthService } from 'src/core/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [...databaseProviders, ...userProviders, AuthService, JwtService],
})
export class UsersModule {}
