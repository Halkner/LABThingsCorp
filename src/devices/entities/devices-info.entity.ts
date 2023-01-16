import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Devices } from './devices.entity';

@Entity({ name: 'devices_info' })
export class DeviceInfo{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    virtual_id: string;

    @Column()
    ip_address: string;

    @Column()
    mac_address: string;

    @Column()
    signal: string;

    @OneToOne(() => Devices, info => DeviceInfo, {nullable: true})
    device: Devices;
}