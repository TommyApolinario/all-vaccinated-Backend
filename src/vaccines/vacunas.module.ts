import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from '../laboratory/entities/laboratory.entity';
import { LaboratoryModule } from '../laboratory/laboratory.module';
import { Vaccine } from './entities/vaccine.entity';
import { VaccineService } from './services/vaccine.service';
import { VaccineCreateController } from './vaccine-create/vaccine-create.controller';

@Module({
  controllers: [VaccineCreateController],
  imports: [TypeOrmModule.forFeature([Vaccine, Laboratory]), LaboratoryModule],
  providers: [VaccineService],
})
export class VaccinesModule {}
