import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly _tracksService: TracksService) {}
  @Get()
  getAll() {
    return this._tracksService.getAll();
  }
  @Get(':id')
  get(@Param() params) {
    return this._tracksService.get(params.id);
  }
  @HttpCode(201)
  @Post()
  createUser(@Body() track: CreateTrackDto) {
    return this._tracksService.createTrack(track);
  }
  @Put(':id')
  updatePassword(@Param() params, @Body() track: CreateTrackDto) {
    return this._tracksService.updateTrack(params.id, track);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteUser(@Param() params) {
    return this._tracksService.deleteTrack(params.id);
  }
}
