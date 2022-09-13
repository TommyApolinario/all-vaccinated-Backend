import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonListController } from './person-list/person-list.controller';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';

@Module({
  controllers: [PersonListController],
  providers: [PersonService],
  imports: [TypeOrmModule.forFeature([Person])],
})
export class PersonModule {}
