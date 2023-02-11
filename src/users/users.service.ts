import { HttpException, Injectable } from '@nestjs/common';
import { User } from './users.types';
import { UserEntity } from './user.entity';
import { v4, validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((u) => {
      const { password, ...user } = u;
      return user;
    });
  }

  async get(userId: string): Promise<User> {
    if (!validate(userId)) throw new HttpException('ID is not valid', 400);

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new HttpException('User not found', 404);

    const { password, ...newUser } = user;

    return newUser;
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      ...userDto,
      id: v4(),
      version: 1,
    };
    await this.userRepository.insert(newUser);
    const { password, ...returnUser } = newUser;

    return returnUser;
  }

  async changePassword(
    userId: string,
    passwordDto: ChangePasswordDto,
  ): Promise<User> {
    if (!validate(userId)) throw new HttpException('ID is not valid', 400);

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new HttpException('User not found', 404);

    if (user.password !== passwordDto.oldPassword)
      throw new HttpException('Old password is wrong', 403);

    user.password = passwordDto.newPassword;
    user.version++;
    await this.userRepository.save(user);
    const { password, ...newUser } = user;

    return newUser;
  }

  async deleteUser(userId: string): Promise<void> {
    if (!validate(userId)) throw new HttpException('ID is not valid', 400);

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new HttpException('User not found', 404);

    await this.userRepository.delete({ id: userId });
  }
}
