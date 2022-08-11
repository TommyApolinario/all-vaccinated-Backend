import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO } from '../dtos';
import { UsersService } from '../users.service';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  public constructor(private readonly service: UsersService) {}

  @Post('login')
  public loginUser(@Body() user: UserLoginDTO) {
    return user;
  }

  @Post('register')
  public async create(@Body() user: UserRegisterDTO) {
    if (user.password !== user.repeat_password) throw new BadRequestException();

    return await this.service.create({
      birthday: user.birthday,
      email: user.email,
      identification: user.identification,
      name: user.name,
      surname: user.surname,
      password: user.password,
      phoneNumber: user.phone_number,
    });
  }
}
