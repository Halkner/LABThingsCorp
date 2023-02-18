import { UpdateDeviceStatus } from './dto/update-device-status.dto';
import { Users } from 'src/users/entities/user.entity';
import { UserDevices } from 'src/userdevices/entities/user-devices.entity';
import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Devices } from 'src/devices/entities/devices.entity';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { VinculateDeviceDto } from './dto/vinculate.dto';
import { LocationEntity } from './entities/location.entity';
import { FindUserDevicesResponseDto } from './dto/find-user-devices-response.dto';
import { LocationQueryDto } from './dto/location-query.dto';

@Injectable()
export class UserDevicesService {
  constructor(
    @Inject('USER_DEVICES_REPOSITORY')
    private userDevicesRepository: Repository<UserDevices>,
    @Inject('DEVICES_REPOSITORY')
    private devicesRepository: Repository<Devices>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
    @Inject('LOCATION_REPOSITORY')
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  vinculateDeviceToUser(
    jwtPayloadUser: JwtPayloadUser,
    vinculateDeviceDto: VinculateDeviceDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = jwtPayloadUser;
        const { deviceId, locationId, room } = vinculateDeviceDto;
        const user = await this.userRepository.findOne({
          where: { userId: id },
        });

        const device = await this.devicesRepository.findOne({
          where: { deviceId: deviceId },
        });

        if (!device) {
          reject('Device not found');
          return;
        }

        const location = await this.locationRepository.findOne({
          where: { locationId: locationId },
        });

        if (!location) {
          reject('Location not found');
          return;
        }

        const newUserDevice = this.userDevicesRepository.create({
          user,
          device,
          room,
          location,
        });
        await this.userDevicesRepository.save(newUserDevice);

        resolve('Vinculation successfull');
      } catch (err) {
        reject(err);
      }
    });
  }

  findAllUserDevices(
    userPayload: JwtPayloadUser,
    locationQuery?: LocationQueryDto,
  ): Promise<FindUserDevicesResponseDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = userPayload;
        const { local } = locationQuery;

        const userDevicesResult = await this.userDevicesRepository.find({
          where: {
            user: { userId: id },
            location: { description: local },
          },
          relations: {
            device: { deviceInfo: true },
          },
          select: {
            userDeviceId: true,
            isOn: true,
            device: {
              name: true,
              type: true,
              manufacturer: true,
            },
          },
        });

        if (!userDevicesResult) {
          resolve([]);
          return;
        }

        const linkedUserDevicesDto: FindUserDevicesResponseDto[] =
          userDevicesResult.map(this.reshapeToFindUserDeviceDto);

        resolve(linkedUserDevicesDto);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  findOneUserDevice(userDeviceId: number): Promise<FindUserDevicesResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const userDevice = await this.userDevicesRepository.findOne({
          where: { userDeviceId: userDeviceId },
          relations: { device: { deviceInfo: true } },
          select: {
            userDeviceId: true,
            isOn: true,
            device: {
              name: true,
              type: true,
              manufacturer: true,
            },
          },
        });

        if (!userDevice) {
          reject('Device not found');
        }

        resolve(this.reshapeToFindUserDeviceDto(userDevice));
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  reshapeToFindUserDeviceDto(
    userDevices: UserDevices,
  ): FindUserDevicesResponseDto {
    const {
      userDeviceId,
      device: { name, type, manufacturer, deviceInfo },
      isOn,
      room,
    } = userDevices;

    return {
      userDeviceId,
      name,
      type,
      manufacturer,
      isOn,
      room,
      deviceInfo,
    };
  }

  updateStatus(
    deviceId: number,
    updateDeviceStatusDto: UpdateDeviceStatus,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { is_on } = updateDeviceStatusDto;
        const userDevice = await this.userDevicesRepository.findOne({
          where: { userDeviceId: deviceId },
        });
        if (!userDevice) {
          reject('Device not found');
        }
        userDevice.isOn = is_on;
        await this.userDevicesRepository.save(userDevice);
        resolve('Device status updated');
      } catch (err) {
        reject({ err, detail: err.detail, code: err.code });
      }
    });
  }
}
