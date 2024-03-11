import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { RestrictTo } from 'src/utils/restrictTo.util';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  async create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  async update(
    @Param('id') id: number,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.update(id, category);
  }
}
