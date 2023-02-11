import { HttpException, Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { Artist } from './artists.types';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}
  async getAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }
  async get(artistId: string): Promise<Artist> {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);

    const artist = await this.artistRepository.findOneBy({ id: artistId });
    if (!artist) throw new HttpException('Artist not found', 404);

    return artist;
  }
  async createArtist(artist: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = { ...artist, id: v4() };
    await this.artistRepository.insert(newArtist);

    return newArtist;
  }
  async updateArtist(
    artistId: string,
    artistDto: CreateArtistDto,
  ): Promise<Artist> {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);

    let artist = await this.artistRepository.findOneBy({ id: artistId });
    if (!artist) throw new HttpException('Artist not found', 404);

    artist = { ...artist, ...artistDto };
    await this.artistRepository.save(artist);

    return artist;
  }
  async deleteArtist(artistId: string): Promise<void> {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);

    const artist = await this.artistRepository.findOneBy({ id: artistId });
    if (!artist) throw new HttpException('Artist not found', 404);

    await this.artistRepository.delete({ id: artistId });
    // tracks.forEach((t) => {
    //   if (t.artistId === artistId) t.artistId = null;
    // });
    // favorites.artists = favorites.artists.filter((a) => a !== artistId);
  }
}
