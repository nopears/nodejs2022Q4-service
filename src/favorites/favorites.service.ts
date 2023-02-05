import { HttpException, Injectable } from '@nestjs/common';
import { favorites } from '../DB/DB';
import { FavoriteResponse } from './favorites.types';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly _albumsService: AlbumsService,
    private readonly _artistsService: ArtistsService,
    private readonly _tracksService: TracksService,
  ) {}
  getAll(): FavoriteResponse[] {
    const res: any = { ...favorites[0] };
    res.albums = res.albums.map((a) => this._albumsService.get(a));
    res.artists = res.artists.map((a) => this._artistsService.get(a));
    res.tracks = res.tracks.map((a) => this._tracksService.get(a));
    return res;
  }
  addTrack(trackId: string) {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);
    const track = this._tracksService.get(trackId);
    if (!track) throw new HttpException('Track not found', 422);
    favorites[0].tracks.push(trackId);
    return 'Track added to favorites';
  }
  deleteTrack(trackId: string) {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);
    if (!(trackId in favorites[0].tracks))
      throw new HttpException('Track not in favorites', 404);
    favorites[0].tracks = favorites[0].tracks.filter((t) => t !== trackId);
    return 'Track was removed from favorites';
  }
  addArtist(artistId: string) {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);
    const artist = this._artistsService.get(artistId);
    if (!artist) throw new HttpException('Artist not found', 422);
    favorites[0].artists.push(artistId);
    return 'Artist added to favorites';
  }
  deleteArtist(artistId: string) {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);
    if (!(artistId in favorites[0].artists))
      throw new HttpException('Artist not in favorites', 404);
    favorites[0].artists = favorites[0].artists.filter((a) => a !== artistId);
    return 'Artist was removed from favorites';
  }
  addAlbum(albumId: string) {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);
    const album = this._albumsService.get(albumId);
    if (!album) throw new HttpException('Album not found', 422);
    favorites[0].albums.push(albumId);
    return 'Album added to favorites';
  }
  deleteAlbum(albumId: string) {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);
    if (!(albumId in favorites[0].albums))
      throw new HttpException('Album not in favorites', 404);
    favorites[0].albums = favorites[0].albums.filter((a) => a !== albumId);
    return 'Album was removed from favorites';
  }
}
