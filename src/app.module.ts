import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    // entities: [User],
     entities: [],
    synchronize: true,
    autoLoadEntities: true
  // }), TypeOrmModule.forFeature([User])],
  }), TypeOrmModule.forFeature([])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
