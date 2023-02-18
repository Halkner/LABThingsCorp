import { Local } from './../../utils/location.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class LocationQueryDto {
  @IsEnum(Local)
  @IsOptional()
  local?: Local;
}
