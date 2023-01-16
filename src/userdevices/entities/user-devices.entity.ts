import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Devices } from 'src/devices/entities/devices.entity';

@Entity({ name: 'user_devices' })
export class UserDevices {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @ManyToOne(type => Devices)
  device: Devices;

  @Column()
  local: string;

  @Column()
  is_on: boolean;

  @Column()
  room: string;
}
