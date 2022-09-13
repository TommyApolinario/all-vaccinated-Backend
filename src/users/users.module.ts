import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { Person } from '../person/entities/person.entity';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, Person]),
    JwtModule.register({
      secret: 'allvaccinated',
      signOptions: { expiresIn: '20h' },
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy],
})
export class UsersModule {}
