import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { Devices } from './entities/devices.entity';

@UseGuards(JwtAuthGuard)
@Controller('/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async findAll(): Promise<Devices[]> {
    try {
      const devices = await this.devicesService.findAll();
      return devices;
    } catch (error) {
      throw error;
    }
  }
}
