import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { devicesProviders } from './devices.providers';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/users/users.providers';

@Module({
  controllers: [DevicesController],
  providers: [...databaseProviders, ...devicesProviders, ...userProviders, DevicesService],
})
export class DevicesModule {}
