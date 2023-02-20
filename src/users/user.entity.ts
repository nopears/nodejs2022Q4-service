import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  login: string;

  @Column('text')
  password?: string;

  @Column('int')
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => {
        console.log(value);
        return value;
      },
      from: (value: Date) => +value.getTime(),
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => +value.getTime(),
    },
  })
  updatedAt: number;
}
