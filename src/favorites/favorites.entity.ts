import { Entity, PrimaryGeneratedColumn, JoinTable, ManyToOne } from 'typeorm';
import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../albums/album.entity';
import { TrackEntity } from '../tracks/track.entity';
@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToOne(() => AlbumEntity, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToOne(() => TrackEntity, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  tracks: TrackEntity[];
}
