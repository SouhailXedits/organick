import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { validationMiddleware } from 'src/validate-requst-body/validate.middleware';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), JwtModule],
  exports: [CategoryService, TypeOrmModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validationMiddleware(CreateCategoryDTO))
      .forRoutes({ path: '/categories', method: RequestMethod.POST })
      .apply(validationMiddleware(UpdateCategoryDTO))
      .forRoutes({ path: '/categories/:id', method: RequestMethod.PUT });
  }
}
