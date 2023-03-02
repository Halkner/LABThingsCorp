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
import { MatchesOtherField } from 'src/core/constraints/matches-other-field.decorator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({ example: 'John Cena' })
  readonly fullName: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
  readonly photoUrl?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'johncena@example.com' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MatchesOtherField('password', {
    message: 'confirmPassword field must match password field',
  })
  @ApiProperty({ example: 'password123' })
  readonly confirmPassword: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '+55 48 99999-9999' })
  readonly phone?: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  @ApiProperty({ type: () => CreateAddressDto })
  readonly address: CreateAddressDto;
}
