import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumsService, TracksService],
})
export class FavoritesModule {}
