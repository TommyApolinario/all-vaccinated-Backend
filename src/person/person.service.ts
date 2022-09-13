import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  public constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}
  public async getPersonByIdentification(identification: string) {
    const person: Partial<Person> = await this.personRepository.findOne({
      select: {
        id: true,
        name: true,
        surname: true,
        identification: true,
        phoneNumber: true,
        email: true,
        birthday: true,
      },
      where: { identification },
    });
    if (!person) throw new NotFoundException('Paciente no encontrado');
    return person;
  }
}
