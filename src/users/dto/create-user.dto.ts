import { Type } from "class-transformer";
import { IsString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsPostalCode, IsUrl, Matches, MaxLength, MinLength, ValidateNested, Equals } from "class-validator";

class UserAddressDto {

    @IsString()
    @IsNotEmpty()
    @IsPostalCode('BR')
    @Matches(/^\d{5}-\d{3}$/, {message: 'Invalid zip-code format.'})
    readonly zipCode: string;

    @IsNotEmpty()
    @IsString()
    readonly street: string;

    @IsInt()
    readonly houseNumber: number;

    @IsNotEmpty()
    @IsString()
    readonly neighborhood: string;

    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @IsNotEmpty()
    @IsString()
    readonly state: string;

    @IsString()
    @IsOptional()
    readonly complement: string;
}

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly fullName: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    readonly photoUrl: string;

    @IsEmail(undefined, {message: "Invalid e-mail."})
    @IsString()
    @MaxLength(30)
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, { message: 'password too weak' })
    readonly password: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    readonly confirmPassword: string;

    @IsString()
    @IsOptional()
    @IsPhoneNumber('BR')
    @Matches(/^\(\d{2}\) [9]\d{4}-\d{4}|^\(\d{2}\) [9]\d{4} \d{4}$/, {message: 'Invalid phone number format.'})
    readonly phone: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserAddressDto)
    readonly address: UserAddressDto;
}
