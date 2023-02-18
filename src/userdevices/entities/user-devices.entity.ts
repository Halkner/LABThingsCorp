import { Devices } from 'src/devices/entities/devices.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity({ name: 'user_devices' })
export class UserDevices {
  @PrimaryGeneratedColumn({ name: 'user_device_id' })
  userDeviceId: number;

  @Column({ default: false, name: 'is_on' })
  isOn: boolean;

  @Column()
  room: string;

  @ManyToOne(() => Users, (user) => user.userDevices, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Devices, (device) => device.userDevices, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'device_id' })
  device: Devices;

  @ManyToOne(() => LocationEntity, (location) => location.userDevices, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;
}
