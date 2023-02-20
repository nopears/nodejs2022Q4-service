import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './favorites.entity';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TrackEntity } from '../tracks/track.entity';
import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../albums/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesEntity,
      TrackEntity,
      ArtistEntity,
      AlbumEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, ArtistsService, AlbumsService],
  exports: [TypeOrmModule],
})
export class FavoritesModule {}
