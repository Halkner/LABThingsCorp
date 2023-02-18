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
  readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNumber()
  @IsNotEmpty()
  readonly houseNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;

  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly complement?: string;
}
