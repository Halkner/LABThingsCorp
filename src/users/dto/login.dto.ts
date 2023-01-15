import { Matches, MinLength, MaxLength, IsString, IsEmail } from 'class-validator';
export class LoginDto {
  @IsEmail(undefined, { message: 'Password or e-mail invalid.' })
  @IsString()
  @MaxLength(30)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, { message: 'Password or e-mail invalid.' })
  readonly password: string;
}
