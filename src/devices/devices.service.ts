import { DeviceInfo } from './entities/devices-info.entity';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Devices } from './entities/devices.entity';

@Injectable()
export class DevicesService {
    constructor(
        @Inject('DEVICES_REPOSITORY')
        private devicesRepository: Repository<Devices>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async getUserDevices(userId: number): Promise<Devices[]> {
        const user = await this.userRepository.findOne({where: {id: userId}, relations: ['devices']});

        return user.devices;
    }

    async create(createDeviceDto: CreateDeviceDto): Promise<Devices> {

        const device = this.devicesRepository.create();
        device.info = new DeviceInfo();
        device.name = createDeviceDto.name;
        device.type = createDeviceDto.type;
        device.manufacturer = createDeviceDto.manufacturer;
        device.photoUrl = createDeviceDto.photoUrl;
        device.info.ip_address = createDeviceDto.info.ip_address;
        device.info.mac_address = createDeviceDto.info.mac_address;
        device.info.signal = createDeviceDto.info.signal;
        device.info.virtual_id = createDeviceDto.info.virtual_id;

        return await this.devicesRepository.save(device);
    }
}