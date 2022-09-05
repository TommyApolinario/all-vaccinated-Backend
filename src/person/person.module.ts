import { Module } from '@nestjs/common';
import { PersonListController } from './person-list/person-list.controller';
import { PersonService } from './person.service';

@Module({
  controllers: [PersonListController],
  providers: [PersonService]
})
export class PersonModule {}
