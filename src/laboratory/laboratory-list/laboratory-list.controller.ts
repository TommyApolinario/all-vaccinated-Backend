import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guards';
import { LaboratoryService } from '../laboratory.service';

@Controller('laboratory')
export class LaboratoryListController {
  public constructor(private service: LaboratoryService) {}

  @UseGuards(JwtAuthGuard)
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
