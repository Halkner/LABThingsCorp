import { UserDevices } from 'src/userdevices/entities/user-devices.entity';
import { Address } from './address.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ name: 'user_id'})
  userId: number;

  @Column({ name: 'full_name'})
  fullName: string;

  @Column({
    name: 'photo_url',
    nullable: true,
    default:
      'https://res.cloudinary.com/dqd4u48y1/image/upload/v1673561527/llama_xx3coq.webp',
  })
  photoUrl: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => Address, (address) => address.addressId, {
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => UserDevices, (userDevice) => userDevice.user)
  userDevices: UserDevices[];


  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
