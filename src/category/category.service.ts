import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({relations: ["products"]});
  }

  async findOne(id: number): Promise<Category | null> {
    try {
      const category = await this.categoriesRepository.findOneBy({ id });
      if (!category) {
        throw new NotFoundException('Catogory with that id not exist ! ', {
          cause: new Error(),
        });
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    try {
      const created = await this.categoriesRepository.save(category);
      return created;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const product = await this.categoriesRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Category with that id not exist ! ', {
          cause: new Error(),
        });
      }
      await this.categoriesRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Category with that id not exist ! ', {
        cause: new Error(),
      });
    }
  }

  async update(id: number, product: UpdateCategoryDTO): Promise<Category> {
    const oldCategory = await this.categoriesRepository.findOneBy({ id });
    if (!oldCategory) {
      throw new NotFoundException('Category with that id not exist ! ', {
        cause: new Error(),
      });
    }
    await this.categoriesRepository.update(id, product);
    return this.categoriesRepository.findOneBy({ id });
  }
}
