import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return `This action returns all users`;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Body() createUserDto: CreateUserDTO) {
    return `This action returns a #${id} user`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createUserDto: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }
}
