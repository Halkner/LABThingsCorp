import { ApiOperation } from '@nestjs/swagger/dist';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { Devices } from './entities/devices.entity';
import { ApiResponse } from '@nestjs/swagger/dist/decorators';

@Controller('/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}
  
  @ApiOperation({summary: 'Get user devices'})
  @ApiResponse({status: 200, description: 'User devices retrieved successfully'})
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getUserDevices(@Param('id') userId: number): Promise<Devices[]> {
    return await this.devicesService.getUserDevices(userId);
  }

  @ApiOperation({summary: 'Create a device'})
  @ApiResponse({status: 201, description: 'Device created successfully'})
  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.devicesService.create(createDeviceDto);
  }
}