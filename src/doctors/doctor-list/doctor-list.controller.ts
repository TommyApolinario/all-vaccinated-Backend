import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guards';
import { DoctorsService } from '../doctors.service';

@Controller('doctors')
export class DoctorListController {
  public constructor(private service: DoctorsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async listDoctors() {
    try {
      return await this.service.getDoctors();
    } catch (err) {
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
