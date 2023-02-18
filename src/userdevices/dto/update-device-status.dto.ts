import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateDeviceStatus {
  @IsBoolean()
  @IsNotEmpty()
  is_on: boolean;
}