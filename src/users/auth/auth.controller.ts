import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserLoginDTO, UserRegisterDTO } from '../dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly service: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  public async loginUser(@Body() user: UserLoginDTO) {
    try {
      return await this.authService.login(user);
    } catch (err) {
      console.log(err);
      if (err instanceof UnauthorizedException) throw err;
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @Post('register')
  public async create(@Body() user: UserRegisterDTO) {
    if (user.password !== user.repeat_password) throw new BadRequestException();

    try {
      return await this.service.create({
        ...user,
        phoneNumber: user.phone_number,
      });
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
