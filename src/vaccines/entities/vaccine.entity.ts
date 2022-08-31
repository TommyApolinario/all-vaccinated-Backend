import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Laboratory } from '../../laboratory/entities/laboratory.entity';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn('increment', { name: 'id_vaccine', unsigned: true })
  public id: number;

  @Column('varchar', {
    length: 20,
    name: 'name',
    nullable: false,
  })
  public name: string;

  @Column('varchar', {
    length: 50,
    name: 'description',
    nullable: false,
  })
  public description: string;

  @Column('varchar', {
    length: 15,
    name: 'lote',
    nullable: false,
  })
  public lote: string;

  @OneToOne(() => Laboratory, (laboratory) => laboratory.id, {
    cascade: false,
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_VACCINE_LABORATORY',
    name: 'id_laboratory',
  })
  public laboratory: Laboratory;

  @Column('int', {
    name: 'quantity',
    nullable: false,
  })
  public quantity: number;

  @Column('date', { name: 'admission_date', nullable: false })
  public admissionDate: Date;

  @Column('date', { name: 'expiration_date', nullable: false })
  public expirationDate: Date;
}
