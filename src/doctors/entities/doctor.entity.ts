import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('increment', {
    name: 'id_doctor',
    unsigned: true,
  })
  public id: number;

  @Column('varchar', {
    length: 20,
    name: 'name',
    nullable: false,
  })
  public name: string;

  @Column('varchar', { length: 30, name: 'address', nullable: false })
  public address: string;

  @Column('varchar', {
    length: 50,
    name: 'email',
    nullable: false,
  })
  public email: string;

  @Column('varchar', { length: 10, name: 'phone_number', nullable: true })
  public phoneNumber: string | null;
}
