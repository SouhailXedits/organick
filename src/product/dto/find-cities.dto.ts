import { Category } from "src/category/category.entity";

export class FindCitiesDTO {
  id?: number;
  name?: string;
  original_price?: number;
  discount?: number;
  description?: string;
  image?: string;
  categoryId?: number;
  categoryName?: string;
  take?: number;
  skip?: number;
}