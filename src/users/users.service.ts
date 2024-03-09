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
import { UpdateUserDTO } from './dto/update-user.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private productService: ProductService,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<any | null> {
    console.log(email);

    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User with that email not exist ! ', {
        cause: new Error(),
      });
    }
    return user;
  }
  async findOne(id: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      return user;
    } catch (error) {
      if (error.code === '22P02') {
        throw new NotFoundException('User with that id not exist ! ', {
          cause: new Error(),
        });
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
        throw new BadRequestException(
          'User with that email already exists ! ',
          {
            cause: new Error(),
          },
        );
      } else {
        throw error;
      }
    }
  }
  async update(id: string, newData: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User with that id not exist ! ', {
        cause: new Error(),
      });
    }

    await this.usersRepository.update(id, newData);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  
}
