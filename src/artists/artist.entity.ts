import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @Column('boolean')
  grammy: boolean;
}
