import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../albums/album.entity';

@Entity()
export class TrackEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @ManyToOne(() => ArtistEntity, (artist: ArtistEntity) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string;

  @ManyToOne(() => AlbumEntity, (album: AlbumEntity) => album.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  albumId: string;

  @Column('int')
  duration: number;
}
