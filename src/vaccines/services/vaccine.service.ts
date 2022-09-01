import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from 'src/laboratory/entities/laboratory.entity';
import { Repository } from 'typeorm';
import { VaccineCreateDTO } from '../dtos/create.vacuna.dto';
import { Vaccine } from '../entities/vaccine.entity';

@Injectable()
export class VaccineService {
  public constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
    @InjectRepository(Laboratory)
    private readonly laboratoryRepository: Repository<Laboratory>,
  ) {}

  public async listVaccines() {
    return await this.vaccineRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        lote: true,
        quantity: true,
        admissionDate: true,
        expirationDate: true,
        laboratory: {
          id: true,
          name: true,
          address: true,
          email: true,
        },
      },
      relations: { laboratory: true },
    });
  }

  public async create(
    vaccineToCreate: VaccineCreateDTO,
  ): Promise<never | Partial<Vaccine>> {
    const laboratory = await this.laboratoryRepository.findOne({
      where: {
        id: vaccineToCreate.id_laboratory,
      },
    });
    if (!laboratory) throw new BadRequestException('Laboratorio no existe');

    const vaccine = this.vaccineRepository.create({
      ...vaccineToCreate,
      admissionDate: new Date(vaccineToCreate.admission_date),
      expirationDate: new Date(vaccineToCreate.expiration_date),
      laboratory,
    });
    return await this.vaccineRepository.save(vaccine);
  }
}
