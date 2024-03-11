import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/product.entity';
import configuration from 'config/configuration';
import { Category } from './category/category.entity';
import { CategoriesModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Inject ConfigService here
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: 'postgres',
        password: 'postgres',
        database: 'organick_db',
        entities: [User, Product, Category],
        synchronize: true,
        autoLoadEntities: true,
      }),
      imports: [ConfigModule],
    }),
    UsersModule,
    ProductModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}