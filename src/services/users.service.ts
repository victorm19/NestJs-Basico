import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'victor@test.com',
      password: 'Abc123',
      role: 'Administrador',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((x) => x.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id}, not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId++;

    const newUser: User = {
      id: this.counterId,
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found.`);
    }

    const index = this.users.findIndex((x) => x.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };

    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found.`);
    }

    this.users.splice(index, 1);

    return true;
  }
}
