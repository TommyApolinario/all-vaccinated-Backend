import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { VaccineCreateDTO } from '../dtos/create.vacuna.dto';
import { VaccineService } from '../services/vaccine.service';

@Controller('vaccines')
export class VaccineCreateController {
  public constructor(private service: VaccineService) {}

  @Get('')
  public async listVaccines() {
    try {
      return await this.service.listVaccines();
    } catch (err) {
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @Post('')
  public async createVaccine(@Body() vaccine: VaccineCreateDTO) {
    try {
      return await this.service.create(vaccine);
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
