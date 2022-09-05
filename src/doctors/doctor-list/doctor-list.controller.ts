import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';

@Controller('doctors')
export class DoctorListController {
  public constructor(private service: DoctorsService) {}

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
