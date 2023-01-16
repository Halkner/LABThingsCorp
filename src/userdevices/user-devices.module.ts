import { userProviders } from './../users/users.providers';
import { JwtService } from '@nestjs/jwt/dist';
import { Module } from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { UserDevicesController } from './user-devices.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userDevicesProviders } from './user-devices.providers';
import { devicesProviders } from 'src/devices/devices.providers';

@Module({
  controllers: [UserDevicesController],
  providers: [
    ...databaseProviders,
    ...devicesProviders,
    ...userProviders,
    ...userDevicesProviders,
    JwtService,
    UserDevicesService,
  ],
})
export class UserDevicesModule {}
