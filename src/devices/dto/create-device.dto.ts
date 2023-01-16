import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    manufacturer: string;

    @IsNotEmpty()
    @IsString()
    photoUrl: string;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => DeviceInfoDto)
    info: DeviceInfoDto;
}