import { LoginDto } from '../../users/dto/login.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Users } from '../../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { Inject } from '@nestjs/common/decorators';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = createUserDto;
        const newUser = this.userRepository.create(createUserDto);
        newUser.salt = await bcrypt.genSalt(14);
        newUser.password = await this.hashPassword(password, newUser.salt);

        const user = await this.userRepository.save(newUser);

        delete user.password;
        delete newUser.salt;

        resolve('User created successfully');
      } catch (err) {
        reject(err);
      }
    });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async login(loginDto: LoginDto) {
    return await new Promise(async (resolve, reject) => {
      try {
        const user = await this.checkCredentials(loginDto);

        if (user === null) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const jwtPayload = {
          id: user.userId,
          name: user.fullName,
          email: user.email,
          photoUrl: user.photoUrl,
        };

        const token = await this.jwtService.sign(jwtPayload);

        resolve({ token, user, message: 'User logged in successfully!' });
      } catch (err) {
        reject(err);
      }
    });
  }

  private async checkCredentials(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: { address: true },
    });

    if (user && (await user.checkPassword(password))) {
      delete user.password;
      delete user.salt;
      return user;
    }

    return null;
  }

  validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({
          code: 401,
          detail: 'JWT expired.',
        });
      }
    });
  }

  decodedToken(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }

  verifyUser(requestId: string, userId: string) {
    if (requestId != userId) {
      throw new UnauthorizedException({
        success: false,
        message:
          'Error: The user in the request does not match the logged-in user.',
      });
    }
    return;
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<string> {
    const { email, oldPassword, newPassword } = changePasswordDto;

    const user = await this.checkCredentials({ email, password: oldPassword });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.salt = await bcrypt.genSalt(12);
    user.password = await this.hashPassword(newPassword, user.salt);

    await this.userRepository.save(user);

    delete user.password;
    delete user.salt;

    await this.userRepository.save(user);
    return 'Password changed successfully';
  }
}
