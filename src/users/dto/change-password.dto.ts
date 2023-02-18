import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { MatchesOtherField } from 'src/core/constraints/matches-other-field.decorator';
export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
    { message: 'password too weak' },
  )
  readonly oldPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
    { message: 'password too weak' },
  )
  readonly newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @MatchesOtherField('password', {
    message: 'confirmPassword field must match password field',
  })
  readonly confirmNewPassword: string;

  @IsEmail(undefined, { message: 'Invalid e-mail.' })
  @IsString()
  @MaxLength(30)
  readonly email: string;
}
