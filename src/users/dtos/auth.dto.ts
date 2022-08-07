import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

class UserAuth {
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @Length(10)
  @IsNumberString()
  readonly identification: string;
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  readonly password: string;
}

export class UserLoginDTO extends UserAuth {}

export class UserRegisterDTO extends UserAuth {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly surname: string;
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsDateString()
  readonly birthday: string;
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsNumberString()
  @IsOptional()
  readonly phone_number: string;
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  readonly repeat_password: string;
}
