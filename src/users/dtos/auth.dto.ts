import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
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
  @MinLength(5)
  @MaxLength(30)
  @IsString()
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
  readonly birthday: string;
  @IsString()
  readonly phone_number: string;
  @IsString()
  readonly repeat_password: string;
}
