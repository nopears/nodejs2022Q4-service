import { HttpException, Injectable } from '@nestjs/common';
import { albums, artists, tracks } from '../DB/DB';
import { v4, validate } from 'uuid';
import { Track } from './tracks.types';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  getAll(): Track[] {
    return tracks;
  }
  get(trackId: string): Track {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);
    const track = tracks.filter((t) => t.id === trackId);
    if (!track[0]) throw new HttpException('Track not found', 404);
    return track[0];
  }
  createTrack(track: CreateTrackDto): Track {
    if (!track.name || !track.duration || !track.artistId || !track.albumId)
      throw new HttpException('Wrong body', 400);
    const artist = artists.filter((a) => a.id === track.artistId)[0];
    if (!artist)
      throw new HttpException('Artist not found, check artistId', 404);
    const album = albums.filter((a) => a.id === track.albumId)[0];
    if (!album) throw new HttpException('Album` not found, check albumId', 404);
    const newTrack: Track = { ...track, id: v4() };
    tracks.push(newTrack);
    return newTrack;
  }
  updateTrack(trackId: string, trackDto: CreateTrackDto): Track {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);
    let track = tracks.filter((t) => t.id === trackId)[0];
    if (!track) throw new HttpException('Track not found', 404);
    const artist = artists.filter((a) => a.id === album.artistId)[0];
    if (!artist)
      throw new HttpException('Artist not found, check artistId', 404);
    const album = albums.filter((a) => a.id === track.albumId)[0];
    if (!album) throw new HttpException('Album` not found, check albumId', 404);
    const tIndex = tracks.findIndex((t) => t.id === trackId);
    track = { ...track, ...trackDto };
    tracks[tIndex] = track;
    return track;
  }
  deleteTrack(trackId: string): void {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);
    const track = tracks.filter((a) => a.id === trackId)[0];
    if (!track) throw new HttpException('Track not found', 404);
    const tIndex = tracks.findIndex((t) => t.id === trackId);
    tracks.splice(tIndex, 1);
  }
}
