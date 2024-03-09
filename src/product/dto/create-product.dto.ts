import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  original_price: number;

  @IsNumber()
  discount: number;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
