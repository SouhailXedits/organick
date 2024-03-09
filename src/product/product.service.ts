import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      return product;
    } catch (error) {
      if (error.code === '22P02') {
        throw new NotFoundException('Product with that id not exist ! ', {
          cause: new Error(),
        });
      } else {
        throw error;
      }
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
    try{
        console.log(id)
        await this.productsRepository.delete(id);
        // retur
    }catch(error) {
        console.log(error)
        throw new NotFoundException('Product with that id not exist ! ', {
          cause: new Error(),
        })
    }
  }

  async update(id: number, product: CreateProductDto): Promise<Product> {
    await this.productsRepository.update(id, product);
    return this.productsRepository.findOneBy({ id });
  }
}
