import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @PrimaryGeneratedColumn('increment')
  id: string;
}
