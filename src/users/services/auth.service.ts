import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { comparePasswords } from '../utils/password-manager';
import { User } from '../entities/user.entity';
import { UserLoginDTO } from '../dtos';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async login(
    userToLogin: UserLoginDTO,
  ): Promise<never | { success: true; token: string }> {
    const user: Partial<User> = await this.userRepository.findOne({
      select: { id: true, password: true, person: { id: false } },
      relations: { person: true },
      where: { person: { identification: userToLogin.identification } },
    });
    const success = await comparePasswords(user.password, userToLogin.password);
    if (!success) throw new UnauthorizedException();
    return {
      success: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhdGlvbiI6IjEyMDcxNjI3MDAiLCJuYW1lIjoiVG9tbXkgQXBvbGluYXJpbyIsImlhdCI6MTUxNjIzOTAyMn0.JXwBq3zoGWkmUcMzLnEZix4FeoPSUOgxgaenVvrZri8',
    };
  }
}
