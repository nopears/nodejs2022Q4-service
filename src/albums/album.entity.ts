import { Column, Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ArtistEntity } from '../artists/artist.entity';

@Entity()
export class AlbumEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  year: number;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artistId: string;
}
