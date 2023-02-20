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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly _albumsService: AlbumsService) {}
  @Get()
  getAll() {
    return this._albumsService.getAll();
  }
  @Get(':id')
  get(@Param() params) {
    return this._albumsService.get(params.id);
  }
  @HttpCode(201)
  @Post()
  createUser(@Body() album: CreateAlbumDto) {
    return this._albumsService.createAlbum(album);
  }
  @Put(':id')
  updatePassword(@Param() params, @Body() album: CreateAlbumDto) {
    return this._albumsService.updateAlbum(params.id, album);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteUser(@Param() params) {
    return this._albumsService.deleteAlbum(params.id);
  }
}
