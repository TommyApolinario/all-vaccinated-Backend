import { Module } from '@nestjs/common';
import { DoctorListController } from './doctor-list/doctor-list.controller';
import { DoctorsService } from './doctors.service';

@Module({
  controllers: [DoctorListController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
