import { User } from 'src/users/entities/user.entity';
import { VinculateDto } from './dto/vinculate.dto';
import { UserDevices } from 'src/userdevices/entities/user-devices.entity';
import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Devices } from 'src/devices/entities/devices.entity';

@Injectable()
export class UserDevicesService {
    constructor(
        @Inject('USER_DEVICES_REPOSITORY')
        private userDevicesRepository: Repository<UserDevices>,
        @Inject('DEVICES_REPOSITORY')
        private devicesRepository: Repository<Devices>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async vinculateDeviceToUser(vinculateDto:VinculateDto): Promise<VinculateDto> {
        
        const userDevice = new UserDevices();

        userDevice.user = await this.userRepository.findOne({where: {id: vinculateDto.user}});
        userDevice.device = await this.devicesRepository.findOne({where: {id: vinculateDto.device}});
        userDevice.is_on = vinculateDto.is_on;
        userDevice.local = vinculateDto.local;
        userDevice.room = vinculateDto.room;

        await this.userDevicesRepository.save(userDevice);

        return vinculateDto;
    }
}
