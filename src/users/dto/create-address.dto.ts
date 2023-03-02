import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/[0-9]{5}-[0-9]{3}/, {
    message: 'CEP is invalid. It must follow this format: 00000-000.',
  })
  @ApiProperty({ example: '12345-678' })
  readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rua A' })
  readonly street: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 123 })
  readonly houseNumber: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bairro A' })
  readonly neighborhood: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'SP' })
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Cidade A' })
  readonly city: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Complemento A' })
  readonly complement?: string;
}
