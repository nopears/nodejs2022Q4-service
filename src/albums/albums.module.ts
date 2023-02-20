import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistsService } from '../artists/artists.service';
import { ArtistEntity } from '../artists/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [TypeOrmModule],
})
export class AlbumsModule {}
