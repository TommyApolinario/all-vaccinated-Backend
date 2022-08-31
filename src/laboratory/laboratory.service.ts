import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Laboratory } from './entities/laboratory.entity';

@Injectable()
export class LaboratoryService {
  public constructor(
    @InjectRepository(Laboratory)
    private readonly laboratoryRepository: Repository<Laboratory>,
  ) {}

  public async getLaboratories() {
    return await this.laboratoryRepository.find();
  }
}
