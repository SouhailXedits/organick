import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { RestrictTo } from 'src/utils/restrictTo.util';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(@Query() query: any): Promise<Product[]> {
    if (Object.keys(query).length === 0) {
      return this.productService.findAll();
    } else {
      return this.productService.findMany(query);
    }
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  async update(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Post(':id/categories')
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  async addCategoriesTOProduct(
    @Param('id') id: number,
    @Body('categoriesIds') categoriesIds: number[],
  ): Promise<Product> {
    return this.productService.addCategoriesTOProduct(id, categoriesIds);
  }
}
