import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { Devices } from './entities/devices.entity';

@UseGuards(JwtAuthGuard)
@Controller('/devices')
@ApiTags('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiOperation({ summary: 'Retrieve all devices' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved all devices successfully.',
    type: [Devices],
  })
  @ApiResponse({ status: 404, description: 'No devices found.' })
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
