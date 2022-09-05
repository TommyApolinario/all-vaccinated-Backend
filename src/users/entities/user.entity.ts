import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Person } from '../../person/entities/person.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'id_user', unsigned: true })
  public id: number;

  @OneToOne(() => Person, (person) => person.id, {
    cascade: false,
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ foreignKeyConstraintName: 'FK_USER_PERSON', name: 'id_person' })
  public person: Person;

  @Column('varchar', { length: 60, name: 'password', nullable: false })
  public password: string;

  // @Column('datetime', { name: 'created_at', nullable: false })
  // public createdAt: Date;

  // @Column('datetime', { name: 'updated_at', nullable: true })
  // public updatedAt: Date | null;

  // @Column('datetime', { name: 'deleted_at', nullable: true })
  // public deletedAt: Date | null;
}
