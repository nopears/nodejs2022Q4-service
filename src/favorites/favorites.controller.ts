import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly _favoritesService: FavoritesService) {}
  @Get()
  getAll() {
    return this._favoritesService.getAll();
  }
  @HttpCode(201)
  @Post('/track/:id/')
  addTrack(@Param() params) {
    return this._favoritesService.addTrack(params.id);
  }
  @HttpCode(204)
  @Delete('/track/:id/')
  deleteTrack(@Param() params) {
    return this._favoritesService.deleteTrack(params.id);
  }
  @HttpCode(201)
  @Post('/album/:id/')
  addAlbum(@Param() params) {
    return this._favoritesService.addAlbum(params.id);
  }
  @HttpCode(204)
  @Delete('/album/:id/')
  deleteAlbum(@Param() params) {
    return this._favoritesService.deleteAlbum(params.id);
  }
  @HttpCode(201)
  @Post('/artist/:id/')
  addArtist(@Param() params) {
    return this._favoritesService.addArtist(params.id);
  }
  @HttpCode(204)
  @Delete('/artist/:id/')
  deleteArtist(@Param() params) {
    return this._favoritesService.deleteArtist(params.id);
  }
}
