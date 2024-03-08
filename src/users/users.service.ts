import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<any | null> {
    return this.usersRepository.findOneBy({ email });
  }
  async findOne(id: string): Promise<User | null> {
    console.log(id)
    try {
      const user = await this.usersRepository.findOneBy({ id });
      console.log(user)
      return user;
    } catch (error) {
      if (error.code === '22P02') {
        throw new NotFoundException('User with that id not exist', {
          cause: new Error(),
        });0
      } else {
        throw error;
      }
    }
  }

  async create(user: CreateUserDTO): Promise<User> {
    try {
      const created = await this.usersRepository.save(user);
      console.log(created);
      return created;
    } catch (error) {
      if (error.code === '23505' && error.detail.includes('already exists')) {
        throw new BadRequestException('User with that email already exists', {
          cause: new Error(),
        });
      } else {
        throw error;
      }
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
