import { LocationEntity } from './entities/location.entity';
import { UserDevices } from './entities/user-devices.entity';
import { DataSource } from 'typeorm';

export const userDevicesProviders = [
  {
    provide: 'USER_DEVICES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserDevices),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'LOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LocationEntity),
    inject: ['DATA_SOURCE'],
  },
];