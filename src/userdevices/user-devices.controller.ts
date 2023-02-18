import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { VinculateDeviceDto } from './dto/vinculate.dto';
import { UserDevicesService } from './user-devices.service';

@Controller('user-devices')
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async vinculateDeviceToUser(
    @Request() req,
    @Body() vinculateDeviceDto: VinculateDeviceDto,
  ) {
    try {
      const jwtPayloadUser = req.user;
      const result = await this.userDevicesService.vinculateDeviceToUser(
        jwtPayloadUser,
        vinculateDeviceDto,
      );
      return { success: true, message: result };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}
