import { Devices } from 'src/devices/entities/devices.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'device_info' })
export class DeviceInfo {
  @PrimaryGeneratedColumn()
  deviceInfoId: number;

  @Column()
  virtual_id: string;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  @Column()
  signal: string;

  @OneToOne(() => Devices, (device) => device.deviceId)
  device: Devices;
}
