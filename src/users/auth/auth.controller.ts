import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO } from '../dtos';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  @Post('login')
  public loginUser(@Body() user: UserLoginDTO) {
    return user;
  }
  @Post('register')
  public registerUser(@Body() user: UserRegisterDTO) {
    return user;
  }
}
