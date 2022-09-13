import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { comparePasswords } from '../utils/password-manager';
import { User } from '../entities/user.entity';
import { UserLoginDTO } from '../dtos';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}

  public async login(
    userToLogin: UserLoginDTO,
  ): Promise<never | { success: true; token: string }> {
    const user: Partial<User> = await this.userRepository.findOne({
      select: {
        id: true,
        password: true,
        person: {
          id: true,
          name: true,
          surname: true,
          email: true,
          identification: true,
          phoneNumber: true,
        },
      },
      relations: { person: true },
      where: { person: { identification: userToLogin.identification } },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const success = await comparePasswords(user.password, userToLogin.password);
    if (!success) throw new UnauthorizedException();

    const payload = {
      id: user.id,
      name: user.person.name,
      surname: user.person.surname,
      phoneNumber: user.person.phoneNumber,
      email: user.person.email,
      identification: user.person.identification,
    };
    const token = await this.jwtAuthService.signAsync(payload);

    return {
      success: true,
      token: token,
    };
  }
}
