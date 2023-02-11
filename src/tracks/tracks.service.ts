import { HttpException, Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { Track } from './tracks.types';
import { CreateTrackDto } from './dto/create-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async get(trackId: string): Promise<Track> {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);

    const track = this.trackRepository.findOneBy({ id: trackId });
    if (!track) throw new HttpException('Track not found', 404);

    return track;
  }

  async createTrack(track: CreateTrackDto): Promise<Track> {
    const newTrack: Track = { ...track, id: v4() };
    await this.trackRepository.insert(newTrack);

    return newTrack;
  }

  async updateTrack(trackId: string, trackDto: CreateTrackDto): Promise<Track> {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);

    let track = await this.trackRepository.findOneBy({ id: trackId });
    if (!track) throw new HttpException('Track not found', 404);

    track = { ...track, ...trackDto };
    await this.trackRepository.save(track);

    return track;
  }
  async deleteTrack(trackId: string): Promise<void> {
    if (!validate(trackId)) throw new HttpException('ID is not valid', 400);

    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (!track) throw new HttpException('Track not found', 404);

    await this.trackRepository.delete({ id: trackId });
  }
}
