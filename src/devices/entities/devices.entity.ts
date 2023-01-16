import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceInfo } from './devices-info.entity';

@Entity({ name: 'devices' })
export class Devices {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  manufacturer: string;

  @Column()
  photoUrl: string;

  @OneToOne(() => DeviceInfo, device => Devices, { cascade: true })
  @JoinColumn({ name: 'info_id' })
  info: DeviceInfo;

  @ManyToMany(type => User, user => user.devices)
  users: User[];
}
