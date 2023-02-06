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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly _artistsService: ArtistsService) {}
  @Get()
  getAll() {
    return this._artistsService.getAll();
  }
  @Get(':id')
  get(@Param() params) {
    return this._artistsService.get(params.id);
  }
  @HttpCode(201)
  @Post()
  createArtist(@Body() artist: CreateArtistDto) {
    return this._artistsService.createArtist(artist);
  }
  @Put(':id')
  updateArtist(@Param() params, @Body() artist: CreateArtistDto) {
    return this._artistsService.updateArtist(params.id, artist);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteArtist(@Param() params) {
    return this._artistsService.deleteArtist(params.id);
  }
}
