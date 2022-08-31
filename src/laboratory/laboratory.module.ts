import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from './entities/laboratory.entity';
import { LaboratoryListController } from './laboratory-list/laboratory-list.controller';
import { LaboratoryService } from './laboratory.service';

@Module({
  controllers: [LaboratoryListController],
  imports: [TypeOrmModule.forFeature([Laboratory])],
  providers: [LaboratoryService],
})
export class LaboratoryModule {}
