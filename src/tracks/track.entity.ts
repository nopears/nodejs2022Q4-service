import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../albums/album.entity';

@Entity()
export class TrackEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artistId: string;

  @ManyToOne(() => AlbumEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  albumId: string;

  @Column('int')
  duration: number;
}
