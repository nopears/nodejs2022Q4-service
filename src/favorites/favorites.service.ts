import { HttpException, Injectable } from '@nestjs/common';
import { albums, artists, favorites, tracks } from '../DB/DB';
import { FavoriteResponse } from './favorites.types';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(
    // private readonly _albumsService: AlbumsService,
    // private readonly _artistsService: ArtistsService,
    // private readonly _tracksService: TracksService,
  ) {}
  getAll(): FavoriteResponse[] {
    if (favorites) {
      const res: any = { ...favorites };
      // res.albums = res.albums.map((a) => this._albumsService.get(a));
      // res.artists = res.artists.map((a) => this._artistsService.get(a));
      // res.tracks = res.tracks.map((a) => this._tracksService.get(a));
      return res;
    }
    return [];
  }
  addTrack(trackId: string) {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);
    const track = tracks.filter((t) => t.id === trackId)[0];
    if (!track) throw new HttpException('Track not found', 422);
    favorites.tracks.push(trackId);
    return 'Track added to favorites';
  }
  deleteTrack(trackId: string) {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);
    if (!favorites.tracks.includes(trackId))
      throw new HttpException('Track not in favorites', 404);
    favorites.tracks = favorites.tracks.filter((t) => t !== trackId);
    return 'Track was removed from favorites';
  }
  addArtist(artistId: string) {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);
    const artist = artists.filter((a) => a.id === artistId)[0];
    if (!artist) throw new HttpException('Artist not found', 422);
    favorites.artists.push(artistId);
    return 'Artist added to favorites';
  }
  deleteArtist(artistId: string) {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);
    if (!favorites.artists.includes(artistId))
      throw new HttpException('Artist not in favorites', 404);
    favorites.artists = favorites.artists.filter((a) => a !== artistId);
    return 'Artist was removed from favorites';
  }
  addAlbum(albumId: string) {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);
    const album = albums.filter((a) => a.id === albumId)[0];
    if (!album) throw new HttpException('Album not found', 422);
    favorites.albums.push(albumId);
    return 'Album added to favorites';
  }
  deleteAlbum(albumId: string) {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);
    if (!favorites.albums.includes(albumId))
      throw new HttpException('Album not in favorites', 404);
    favorites.albums = favorites.albums.filter((a) => a !== albumId);
    return 'Album was removed from favorites';
  }
}
