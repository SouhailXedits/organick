import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RestrictTo } from 'src/utils/restrictTo.util';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDTO);
  }

  
}
