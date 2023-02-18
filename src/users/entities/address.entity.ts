import { Users } from './user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  addressId: number;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  houseNumber: number;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  complement: string;

  @OneToOne(() => Users, (user) => user.userId)
  user: Users;
}