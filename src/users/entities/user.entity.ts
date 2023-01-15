import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @Column({ nullable: true })
  url: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column({ length: 100, unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  phone: string;

  @OneToOne(() => Address, (user) => User, { cascade: true })
  @JoinColumn({ name: 'address_id'})
  address: Address;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
