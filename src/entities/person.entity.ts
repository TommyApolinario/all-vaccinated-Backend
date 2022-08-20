import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('increment', { name: 'id_person', unsigned: true })
  public id: number;

  @Column('varchar', {
    length: 10,
    name: 'identification',
    nullable: false,
  })
  public identification: string;

  @Column('varchar', { length: 30, name: 'name', nullable: false })
  public name: string;

  @Column('varchar', { length: 30, name: 'surname', nullable: false })
  public surname: string;

  @Column('varchar', {
    length: 50,
    name: 'email',
    nullable: false,
  })
  public email: string;

  @Column('varchar', { length: 10, name: 'phone_number', nullable: true })
  public phoneNumber: string | null;

  // @Column('date', { name: 'birthday', nullable: false })
  // public birthday: Date;

  // @Column('datetime', { name: 'created_at', nullable: false })
  // public createdAt: Date;

  // @Column('datetime', { name: 'updated_at', nullable: true })
  // public updatedAt: Date | null;

  // @Column('datetime', { name: 'deleted_at', nullable: true })
  // public deletedAt: Date | null;
}
