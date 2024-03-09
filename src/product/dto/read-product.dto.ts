import { ReadUserDTO } from "src/users/dto/read-user.dto";

export class ReadProductDto {
  id: number;
  name: string;
  original_price: number;
  discount: number;
  description: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}
