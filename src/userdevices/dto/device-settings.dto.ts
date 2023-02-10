import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Local } from '../../user-devices/enum/location.enum';

export class DeviceSettingsDto {
  @IsNotEmpty()
  @IsBoolean()
  is_on: boolean;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  room: string;

  @IsNotEmpty()
  @IsEnum(Local)
  location: Local;
}
