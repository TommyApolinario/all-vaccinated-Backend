import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { omit } from 'lodash';

import { encryptPassword } from '../utils/password-manager';
import { CreateUserDTO } from '../dtos/create.user.dto';
import { Person } from '../../entities/person.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  public async create(
    userToCreate: CreateUserDTO,
  ): Promise<never | Partial<User>> {
    const person = this.personRepository.create({
      ...userToCreate,
      birthday: new Date(userToCreate.birthday),
    });
    const userFound = await this.personRepository.findOne({
      where: {
        identification: userToCreate.identification,
      },
    });
    if (userFound) throw new BadRequestException('Usuario ya registrado');
    await this.personRepository.save(person);

    const user = this.userRepository.create({
      password: await encryptPassword(userToCreate.password),
      person,
    });
    const userSaved = await this.userRepository.save(user);
    return omit(userSaved, 'password');
  }
}
