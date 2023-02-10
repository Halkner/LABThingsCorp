import { DeviceInfo } from './entities/devices-info.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Devices } from './entities/devices.entity';
import { UpdateDeviceDto } from './dto/update-device.dto';

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

  async create(createDeviceDto: CreateDeviceDto) {
    return new Promise<Devices>(async (resolve, reject) => {
      try {
        const { type, name, manufacturer, photoUrl } = createDeviceDto;

        const newDevice = await this.devicesRepository.create();

        newDevice.type = type;
        newDevice.name = name;
        newDevice.manufacturer = manufacturer;
        newDevice.photoUrl = photoUrl;

        const device = await this.devicesRepository.save(newDevice);

        resolve(device);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findOne(id: number): Promise<Devices> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.devicesRepository.findOneByOrFail({ id: id });
        resolve(device);
      } catch (err) {
        reject(err);
      }
    });
  }

  update(id: number, dto: UpdateDeviceDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.devicesRepository.findOne({
          where: { id: id },
        });
        const { manufacturer, name, photoUrl, type } = dto;

        device.manufacturer = manufacturer;
        device.name = name;
        device.photoUrl = photoUrl;
        device.type = type;

        resolve(await this.devicesRepository.save(device));
      } catch (error) {
        reject(error);
      }
    });
  }

  async remove(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.devicesRepository.findOne({
          where: { id: id },
        });

        if (!device) {
          throw new NotFoundException();
        }

        await this.devicesRepository.remove(device);

        resolve({ acknowledged: true, deletedCount: 1 });
      } catch (error) {
        reject(error);
      }
    });
  }
}
