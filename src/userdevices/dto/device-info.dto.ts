import {
  IsIP,
  IsMACAddress,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class DeviceInfoDto {
  @IsOptional()
  @IsString()
  virtual_id: string;

  @IsOptional()
  @IsIP()
  ip_address: string;

  @IsOptional()
  @IsString()
  @IsMACAddress()
  mac_address: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(-100)
  signal: number;
}
