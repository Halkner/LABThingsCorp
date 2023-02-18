
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VinculateDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  deviceId: number;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @IsString()
  @IsNotEmpty()
  room: string;
}
