import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { JwtAuthGuard } from '../../guards/jwt-auth.guards';
import { PersonService } from '../person.service';

@Controller('person')
export class PersonListController {
  public constructor(private service: PersonService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':identification')
  public async listPerson(@Param('identification') identification: string) {
    try {
      return await this.service.getPersonByIdentification(identification);
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
