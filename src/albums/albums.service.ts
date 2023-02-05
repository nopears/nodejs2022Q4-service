import { HttpException, Injectable } from '@nestjs/common';
import { albums, tracks } from '../DB/DB';
import { Album } from './albums.types';
import { v4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  getAll(): Album[] {
    return albums;
  }
  get(albumId: string): Album {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);
    const album = albums.filter((a) => a.id === albumId);
    if (!album[0]) throw new HttpException('Album not found', 404);
    return album[0];
  }
  createAlbum(album: CreateAlbumDto): Album {
    const newAlbum: Album = { ...album, id: v4() };
    albums.push(newAlbum);
    return newAlbum;
  }
  updateAlbum(albumId: string, albumDto: CreateAlbumDto): Album {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);
    let album = albums.filter((a) => a.id === albumId)[0];
    if (!album) throw new HttpException('Album not found', 404);
    const aIndex = albums.findIndex((a) => a.id === albumId);
    album = { ...album, ...albumDto };
    albums[aIndex] = album;
    return album;
  }
  deleteAlbum(albumId: string): void {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);
    const album = albums.filter((a) => a.id === albumId)[0];
    if (!album) throw new HttpException('Album not found', 404);
    const aIndex = albums.findIndex((a) => a.id === albumId);
    albums.splice(aIndex, 1);
    tracks.forEach((t) => {
      if (t.albumId === albumId) t.albumId = null;
    });
  }
}
