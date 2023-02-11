import { HttpException, Injectable } from '@nestjs/common';
import { Album } from './albums.types';
import { v4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from "../artists/artist.entity";

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,

  ) {}

  async getAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async get(albumId: string): Promise<Album> {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);

    const album = this.albumRepository.findOneBy({ id: albumId });
    if (!album) throw new HttpException('Album not found', 404);

    return album;
  }
  async createAlbum(album: CreateAlbumDto): Promise<Album> {
    const artist = await this.artistRepository.findOneBy({
      id: album.artistId,
    });
    if (!artist) throw new HttpException('Artist not found', 404);

    const newAlbum: Album = { ...album, id: v4() };
    await this.albumRepository.insert(newAlbum);

    return newAlbum;
  }
  async updateAlbum(albumId: string, albumDto: CreateAlbumDto): Promise<Album> {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);

    let album = await this.albumRepository.findOneBy({ id: albumId });
    if (!album) throw new HttpException('Album not found', 404);

    album = { ...album, ...albumDto };
    await this.albumRepository.save(album);

    return album;
  }
  async deleteAlbum(albumId: string): Promise<void> {
    if (!validate(albumId)) throw new HttpException('ID is not valid', 400);

    const album = await this.albumRepository.findOneBy({ id: albumId });
    if (!album) throw new HttpException('Album not found', 404);

    await this.albumRepository.delete({ id: albumId });
    // tracks.forEach((t) => {
    //   if (t.albumId === albumId) t.albumId = null;
    // });
    // favorites.albums = favorites.albums.filter((a) => a !== albumId);
  }
}
