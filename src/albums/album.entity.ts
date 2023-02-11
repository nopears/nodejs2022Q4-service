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

  @ManyToOne(() => ArtistEntity, (artist: ArtistEntity) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string;
}
