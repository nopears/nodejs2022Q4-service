import { HttpException, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity } from './favorites.entity';
import { Repository } from 'typeorm';
import { TrackEntity } from '../tracks/track.entity';
import { TracksService } from '../tracks/tracks.service';
import { ArtistEntity } from '../artists/artist.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { AlbumEntity } from '../albums/album.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoriteRepository: Repository<FavoritesEntity>,
    private _tracksService: TracksService,
    private _artistsService: ArtistsService,
    private _albumsService: AlbumsService,
  ) {}

  async getAll(): Promise<any> {
    const fav = (
      await this.favoriteRepository.find({
        relations: { artists: true, tracks: true, albums: true },
      })
    )[0];

    if (!fav) {
      await this.favoriteRepository.insert({
        artists: [],
        albums: [],
        tracks: [],
      });

      return { artists: [], albums: [], tracks: [] };
    }

    return fav;
  }

  async addTrack(trackId: string) {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);

    const track: TrackEntity = await this._tracksService.get(trackId);
    if (!track) throw new HttpException('Track not found', 422);

    const fav = (
      await this.favoriteRepository.find({
        relations: { tracks: true },
      })
    )[0];

    if (!fav.tracks) fav.tracks = [];

    fav.tracks.push(track);
    await this.favoriteRepository.save(fav);

    return 'Track added to favorites';
  }

  async deleteTrack(trackId: string) {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);

    const track: TrackEntity = await this._tracksService.get(trackId);
    const fav = (
      await this.favoriteRepository.find({
        relations: { tracks: true },
      })
    )[0];

    if (!fav.tracks.includes(track))
      throw new HttpException('Track not in favorites', 404);

    fav.tracks = fav.tracks.filter((t) => t !== track);
    await this.favoriteRepository.save(fav);

    return 'Track was removed from favorites';
  }

  async addArtist(artistId: string) {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);

    const artist: ArtistEntity = await this._artistsService.get(artistId);
    if (!artist) throw new HttpException('Artist not found', 422);

    const fav = (
      await this.favoriteRepository.find({
        relations: { artists: true },
      })
    )[0];

    fav.artists.push(artist);
    await this.favoriteRepository.save(fav);

    return 'Artist added to favorites';
  }

  async deleteArtist(artistId: string) {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);

    const artist: ArtistEntity = await this._artistsService.get(artistId);
    const fav = (
      await this.favoriteRepository.find({
        relations: { artists: true },
      })
    )[0];

    if (!fav.artists.includes(artist))
      throw new HttpException('Artist not in favorites', 404);

    fav.artists = fav.artists.filter((a) => a !== artist);
    await this.favoriteRepository.save(fav);

    return 'Artist was removed from favorites';
  }

  async addAlbum(albumId: string) {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);

    const album: AlbumEntity = await this._albumsService.get(albumId);
    if (!album) throw new HttpException('Album not found', 422);

    const fav = (
      await this.favoriteRepository.find({
        relations: { albums: true },
      })
    )[0];

    fav.albums.push(album);
    await this.favoriteRepository.save(fav);

    return 'Album added to favorites';
  }

  async deleteAlbum(albumId: string) {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);

    const album: AlbumEntity = await this._albumsService.get(albumId);
    const fav = (
      await this.favoriteRepository.find({
        relations: { albums: true },
      })
    )[0];

    if (!fav.albums.includes(album))
      throw new HttpException('Album not in favorites', 404);

    fav.albums = fav.albums.filter((a) => a !== album);
    await this.favoriteRepository.save(fav);

    return 'Album was removed from favorites';
  }
}
