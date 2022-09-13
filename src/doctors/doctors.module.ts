import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorListController } from './doctor-list/doctor-list.controller';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';

@Module({
  controllers: [DoctorListController],
  providers: [DoctorsService],
  imports: [TypeOrmModule.forFeature([Doctor])],
})
export class DoctorsModule {}
