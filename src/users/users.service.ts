import { HttpException, Injectable } from '@nestjs/common';
import { users } from '../DB/DB';
import { User } from './users.types';
import { v4, validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  getAll(): User[] {
    return users;
  }
  get(userId: string): User {
    if (!validate(userId)) throw new HttpException('ID is not valid', 400);
    const user = users.filter((u) => u.id === userId);
    if (!user[0]) throw new HttpException('User not found', 404);
    return users[0];
  }
  createUser(user: CreateUserDto): User {
    if (!user.login || !user.password)
      throw new HttpException('Wrong body', 400);
    const newUser: User = {
      ...user,
      id: v4(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    return newUser;
  }
  changePassword(userId: string, passwordDto: ChangePasswordDto): User {
    if (!validate(userId)) throw new HttpException('ID is not valid', 400);
    const user = users.filter((u) => u.id === userId);
    if (!user[0]) throw new HttpException('User not found', 404);
    if (user[0].password !== passwordDto.oldPassword)
      throw new HttpException('Old password is wrong', 403);
    user[0].password = passwordDto.newPassword;
    return user[0];
  }
  deleteUser(userId: string): void {
    if (!validate(userId)) throw new HttpException('ID is not valid', 400);
    const user = users.filter((u) => u.id === userId);
    if (!user[0]) throw new HttpException('User not found', 404);
    const uIndex = users.findIndex((u) => u.id === userId);
    users.splice(uIndex, 1);
  }
}
