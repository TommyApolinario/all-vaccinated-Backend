import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entities/person.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create.user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  public async create(userToCreate: CreateUserDTO): Promise<never | User> {
    try {
      const person = this.personRepository.create({
        identification: userToCreate.identification,
        name: userToCreate.name,
        surname: userToCreate.surname,
        email: userToCreate.email,
        phoneNumber: userToCreate.phoneNumber,
      });
      await this.personRepository.save(person);

      const user = this.userRepository.create({
        password: userToCreate.password,
        person,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
