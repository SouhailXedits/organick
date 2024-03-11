import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { validationMiddleware } from 'src/validate-requst-body/validate.middleware';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), JwtModule],
  exports: [ProductService, TypeOrmModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validationMiddleware(CreateProductDto))
      .forRoutes({ path: '/products', method: RequestMethod.POST })
      .apply(validationMiddleware(UpdateProductDto))
      .forRoutes({ path: '/products/:id', method: RequestMethod.PUT });
  }
}
