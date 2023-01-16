import { Controller } from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';

@Controller('user-devices')
export class UserDevicesController {
  constructor(
    private readonly userDevicesService: UserDevicesService,
    ) {}
}
