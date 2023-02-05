import { HttpException, Injectable } from '@nestjs/common';
import { artists } from '../DB/DB';
import { v4, validate } from 'uuid';
import { Artist } from './artists.types';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  getAll(): Artist[] {
    return artists;
  }
  get(artistId: string): Artist {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);
    const artist = artists.filter((a) => a.id === artistId);
    if (!artist[0]) throw new HttpException('Artist not found', 404);
    return artist[0];
  }
  createArtist(artist: CreateArtistDto): Artist {
    const newArtist: Artist = { ...artist, id: v4() };
    artists.push(newArtist);
    return newArtist;
  }
  updateArtist(artistId: string, artistDto: CreateArtistDto): Artist {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);
    let artist = artists.filter((a) => a.id === artistId)[0];
    if (!artist) throw new HttpException('Artist not found', 404);
    const aIndex = artists.findIndex((a) => a.id === artistId);
    artist = { ...artist, ...artistDto };
    artists[aIndex] = artist;
    return artist;
  }
  deleteArtist(artistId: string): void {
    if (!validate(artistId)) throw new HttpException('ID is not valid', 400);
    const artist = artists.filter((a) => a.id === artistId)[0];
    if (!artist) throw new HttpException('Artist not found', 404);
    const aIndex = artists.findIndex((a) => a.id === artistId);
    artists.splice(aIndex, 1);
  }
}
