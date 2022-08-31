import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { Person } from '../entities/person.entity';
import { User } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Person])],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
