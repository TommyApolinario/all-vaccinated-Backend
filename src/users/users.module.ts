import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/person.entity';
import { AuthController } from './auth/auth.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Person])],
  providers: [UsersService],
})
export class UsersModule {}
