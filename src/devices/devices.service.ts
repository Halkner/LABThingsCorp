import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Devices } from './entities/devices.entity';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DEVICES_REPOSITORY')
    private devicesRepository: Repository<Devices>,
  ) {}

  async findAll() {
    const devices = await this.devicesRepository.find();
    return devices;
  }
}
