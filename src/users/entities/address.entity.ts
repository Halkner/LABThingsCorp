import { User } from './user.entity';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from "typeorm";

@Entity({name: 'addresses'})
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    street: string;

    @IsNotEmpty()
    @IsString()
    @Column({name: 'zip_code'})
    zipCode: string;

    @IsNotEmpty()
    @Column({name: 'house_number'})
    houseNumber: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    neighborhood: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    city: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    state: string;

    @IsOptional()
    @IsString()
    @Column({nullable: true})
    complement: string;

    @OneToOne(() => User, address => Address)
    user: User;
}