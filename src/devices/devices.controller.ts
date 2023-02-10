import { CreateDeviceDto } from './dto/create-device.dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { Devices } from './entities/devices.entity';
import { UpdateDeviceDto } from './dto/update-device.dto';

@UseGuards(JwtAuthGuard)
@Controller('/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Devices> {
    const idToFind = +id;

    try {
      return await this.devicesService.findOne(idToFind);
    } catch (err) {
      throw new HttpException(
        { message: `Device with id "${id}" doesn't exist.` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto): Promise<Devices> {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  async findAll(): Promise<Devices[]> {
    try {
      const devices = await this.devicesService.findAll();
      return devices;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDeviceDto) {
    try {
      const device = await this.devicesService.update(+id, dto);
      return device;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
