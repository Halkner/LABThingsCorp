import { UserDevices } from 'src/userdevices/entities/user-devices.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceInfo } from '../../userdevices/entities/devices-info.entity';

@Entity({ name: 'devices' })
export class Devices {
  @PrimaryGeneratedColumn()
  deviceId: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  manufacturer: string;

  @Column()
  photoUrl: string;

  @OneToOne(() => DeviceInfo, (deviceInfo) => deviceInfo.deviceInfoId, {
    cascade: true,
  })
  @JoinColumn({ name: 'deviceInfoId' })
  deviceInfo: DeviceInfo;

  @OneToMany(() => UserDevices, (userDevice) => userDevice.device)
  userDevices: UserDevices[];
}
