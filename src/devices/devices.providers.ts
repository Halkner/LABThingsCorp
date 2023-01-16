import { Devices } from './entities/devices.entity';
import { DataSource } from 'typeorm';

export const devicesProviders = [
  {
    provide: 'DEVICES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Devices),
    inject: ['DATA_SOURCE'],
  },
];
