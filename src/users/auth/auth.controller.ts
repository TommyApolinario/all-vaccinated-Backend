import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDTO } from '../dtos';

@Controller('auth')
export class AuthController {
  @Post('')
  @UsePipes(ValidationPipe)
  public loginUser(@Body() user: UserLoginDTO) {
    return user;
  }
}
