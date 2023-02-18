import { UserDevices } from './user-devices.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'locations' })
export class LocationEntity {
  @PrimaryGeneratedColumn()
  locationId: number;

  @Column()
  description: string;

  @OneToMany(() => UserDevices, (userDevice) => userDevice.location)
  userDevices: UserDevices[];
}