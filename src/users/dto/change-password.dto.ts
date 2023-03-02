import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    minLength: 8,
    maxLength: 20,
    pattern:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,}$',
    example: 'OldPassword123@',
  })
  readonly oldPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
    { message: 'password too weak' },
  )
  @ApiProperty({
    minLength: 8,
    maxLength: 20,
    pattern:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,}$',
    example: 'NewPassword123@',
  })
  readonly newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @MatchesOtherField('password', {
    message: 'confirmPassword field must match password field',
  })
  @ApiProperty({
    minLength: 8,
    maxLength: 20,
    pattern:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,}$',
    example: 'NewPassword123@',
  })
  readonly confirmNewPassword: string;

  @IsEmail(undefined, { message: 'Invalid e-mail.' })
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    maxLength: 30,
    example: 'johncena@example.com',
  })
  readonly email: string;
}
