import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { validationMiddleware } from 'src/validate-requst-body/validate.middleware';
import { SignInDTO } from './dto/singin-dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [UsersModule, JwtModule, ConfigModule],
})
export class AuthModule {
  configure(consume: MiddlewareConsumer) {
    consume
      .apply(validationMiddleware(SignInDTO))
      .forRoutes({ path: '/auth/login', method: RequestMethod.POST })
      .apply(validationMiddleware(CreateUserDTO))
      .forRoutes({ path: '/auth/signup', method: RequestMethod.POST })
  }
}
