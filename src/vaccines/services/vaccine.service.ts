import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from 'src/laboratory/entities/laboratory.entity';
import { Repository } from 'typeorm';
import { VaccineCreateDTO } from '../dtos/create.vaccine.dto';
import { VaccineUpdateDTO } from '../dtos/update.vaccine.dto';
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

  public async update(
    id: number,
    vaccineToUpdate: VaccineUpdateDTO,
  ): Promise<boolean> {
    const result = await this.vaccineRepository.update(
      {
        id,
      },
      {
        name: vaccineToUpdate.name,
        lote: vaccineToUpdate.lote,
        admissionDate: vaccineToUpdate.admission_date,
        expirationDate: vaccineToUpdate.expiration_date,
      },
    );
    return result.affected > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.vaccineRepository.delete({
      id,
    });
    return result.affected > 0;
  }
}
