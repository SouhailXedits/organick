import { Product } from 'src/product/product.entity';
import { Category } from '../category.entity';

export class ReadCategoryDTO {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  products: Product[];

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.created_at = category.created_at;
    this.updated_at = category.updated_at;
    // this.products = category.products.map((product) => new Product(product)); // Assuming ProductDTO exists
  }
}
