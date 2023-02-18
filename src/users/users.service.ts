import { Users } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Injectable, Inject } from '@nestjs/common';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { Local } from 'src/utils/location.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
  ) {}

  findOne(jwtPayloadUser: JwtPayloadUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = jwtPayloadUser;
        const user = await this.userRepository.findOne({
          where: { userId: id },
          relations: { address: true },
          select: {
            userId: true,
            fullName: true,
            photoUrl: true,
            email: true,
            phone: true,
          },
        });

        if (!user.phone) {
          delete user.phone;
        }

        delete user.password;
        delete user.salt;
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOne({
          where: { userId: id },
          relations: { address: true },
        });

        const { fullName, email, phone, photoUrl, address } = updateUserDto;
        const {
          city,
          neighborhood,
          state,
          zipCode,
          houseNumber,
          street,
          complement,
        } = address;

        user.email = email || user.email;
        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;
        user.photoUrl = photoUrl || user.photoUrl;
        user.address.city = city || user.address.city;
        user.address.complement = complement || user.address.complement;
        user.address.neighborhood = neighborhood || user.address.neighborhood;
        user.address.houseNumber = houseNumber || user.address.houseNumber;
        user.address.state = state || user.address.state;
        user.address.street = street || user.address.street;
        user.address.zipCode = zipCode || user.address.zipCode;

        const updatedUser = await this.userRepository.save(user);

        delete updatedUser.password;
        delete updatedUser.salt;

        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  getLocals() {
    const locals = [
      {
        _id: '761e30b1-8b14-4f3b-a3f9-25c0f06a17d8',
        description: Local.CASA,
      },
      {
        _id: 'fbf6fca2-ba05-45b2-9fcb-9a9f8b8d66b8',
        description: Local.ESCRITORIO,
      },
      {
        _id: '6e0b2d0a-1c47-44b7-b9e9-77dd7b91d906',
        description: Local.FABRICA,
      },
    ];
    return locals;
  }
}
