import { LoginDto } from '../../users/dto/login.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { hash, compare } from 'bcrypt';
import { Address } from '../../users/entities/address.entity';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtService } from '@nestjs/jwt/dist';
import { Inject } from '@nestjs/common/decorators';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const addressDto = createUserDto.address;

    const user = plainToClass(User, createUserDto);
    const address = plainToClass(Address, addressDto);
    user.address = address;

    user.password = await hash(user.password, 10);

    return await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<object> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      url: user.url,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user_info: payload
    };
  }
}
