import { Type } from 'class-transformer';
import { Length, ValidateNested, IsUrl } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 30)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 30)
    type: string;

    @Length(1, 30)
    @IsNotEmpty()
    @IsString()
    manufacturer: string;

    @IsNotEmpty()
    @IsUrl()
    photoUrl: string;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => DeviceInfoDto)
    info: DeviceInfoDto;
}