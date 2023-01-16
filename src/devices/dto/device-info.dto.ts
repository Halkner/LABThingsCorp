import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceInfoDto {
    @IsNotEmpty()
    @IsString()
    virtual_id: string;

    @IsNotEmpty()
    @IsString()
    ip_address: string;

    @IsNotEmpty()
    @IsString()
    mac_address: string;

    @IsNotEmpty()
    @IsString()
    signal: string;
}