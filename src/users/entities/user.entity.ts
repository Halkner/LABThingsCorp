import * as bcrypt from 'bcrypt';
import { UserDevices } from './../../userdevices/entities/user-devices.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Address } from './address.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    name: 'full_name',
    length: 100,
    nullable: false,
  })
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @Column({
    name: 'photo_url',
    nullable: true,
    default:
      'https://www.pngfind.com/pngs/m/292-2924933_image-result-for-png-file-user-icon-black.png',
  })
  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column({
    nullable: false,
    length: 100,
    unique: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @IsNotEmpty()
  @IsString()
  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  userAddress: Address;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => UserDevices, (userDevice) => userDevice.user)
  devices: UserDevices[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  addUserDevice(userDevice: UserDevices) {
    if (!this.devices) {
      this.devices = new Array<UserDevices>();
    }
    this.devices.push(userDevice);
  }
}
