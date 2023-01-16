import { CreateDeviceDto } from './dto/create-device.dto';
import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { Devices } from './entities/devices.entity';

@Controller('/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getUserDevices(@Param('id') userId: number): Promise<Devices[]> {
    return await this.devicesService.getUserDevices(userId);
  }

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.devicesService.create(createDeviceDto);
  }
}