import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationMiddleware } from 'src/validate-requst-body/validate.middleware';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validationMiddleware(CreateUserDTO))
      .forRoutes({ path: '/users', method: RequestMethod.POST });
  }
}