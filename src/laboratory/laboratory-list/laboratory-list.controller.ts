import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { LaboratoryService } from '../laboratory.service';

@Controller('laboratory')
export class LaboratoryListController {
  public constructor(private service: LaboratoryService) {}

  @Get('')
  public async listLaboratories() {
    try {
      return await this.service.getLaboratories();
    } catch (err) {
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
