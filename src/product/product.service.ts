import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Between, FindOptionsWhere, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { FindCitiesDTO } from './dto/find-cities.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Product with that id not exist ! ', {
          cause: new Error(),
        });
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async create(product: CreateProductDto): Promise<Product> {
    try {
      const created = await this.productsRepository.save(product);
      return created;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Product with that id not exist ! ', {
          cause: new Error(),
        });
      }
      await this.productsRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Product with that id not exist ! ', {
        cause: new Error(),
      });
    }
  }

  async update(id: number, product: CreateProductDto): Promise<Product> {
    const oldProduct = await this.productsRepository.findOneBy({ id });
    if (!oldProduct) {
      throw new NotFoundException('Product with that id not exist ! ', {
        cause: new Error(),
      });
    }
    await this.productsRepository.update(id, product);
    return this.productsRepository.findOneBy({ id });
  }
  async addCategoriesTOProduct(
    id: number,
    categoriesIds: number[],
  ): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product with that id not exist ! ', {
        cause: new Error(),
      });
    }
    await this.productsRepository
      .createQueryBuilder()
      .relation(Product, 'categories')
      .of(product)
      .add(categoriesIds);
    return this.productsRepository.findOneBy({ id });
  }
   async findMany(queryDto: FindCitiesDTO): Promise<Product[]> {
     const { name, original_price, id, discount, categoryId, categoryName, take, skip } =
       queryDto;
     const filters: FindOptionsWhere<Product> | FindOptionsWhere<Product>[] = {
       ...(name ? { name } : {}),
       ...(discount ? { discount } : {}),
       ...(original_price ? { original_price } : {}),
       ...(id ? { id } : {}),
       ...(categoryId ? { categories: { id: categoryId } } : {}),
       ...(categoryName ? { categories: { name: categoryName } } : {}),
     };
      
    return this.productsRepository.find({ where: filters, take, skip});
  }
}
