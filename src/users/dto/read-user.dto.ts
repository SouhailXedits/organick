import { Product } from "src/product/product.entity";
import { User } from "../user.entity";

export class ReadUserDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  products: Product[]; 

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.image = user.image;
  }
}
