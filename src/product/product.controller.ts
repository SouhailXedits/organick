import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { RestrictTo } from 'src/utils/restrictTo.util';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @RestrictTo('admin')
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    console.log(id);
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
}
