import { Inject } from '@nestjs/common/decorators';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { JwtService } from '@nestjs/jwt/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        private jwtService: JwtService,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
      ) {}

    async getUserProfile(userId: number): Promise<User>{
        return await this.userRepository.findOne({where: {id: userId}, relations: ['address']});
      }
}
