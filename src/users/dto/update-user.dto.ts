import { CreateAddressDto } from './create-address.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly photoUrl?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  readonly address: CreateAddressDto;
}
