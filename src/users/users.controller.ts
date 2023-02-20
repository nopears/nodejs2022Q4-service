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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}
  @Get()
  getAll() {
    return this._usersService.getAll();
  }
  @Get(':id')
  get(@Param() params) {
    return this._usersService.get(params.id);
  }
  @HttpCode(201)
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this._usersService.createUser(user);
  }
  @Put(':id')
  updatePassword(@Param() params, @Body() passwordDto: ChangePasswordDto) {
    return this._usersService.changePassword(params.id, passwordDto);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteUser(@Param() params) {
    return this._usersService.deleteUser(params.id);
  }
}
