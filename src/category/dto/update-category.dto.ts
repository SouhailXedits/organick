import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
