import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal:true,
        envFilePath:".local.env"
        // envFilePath:".prod.env"
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname+'/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNC'),
        logging:false
      }),  
      inject: [ConfigService],
    }),
    UserModule,ContactModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}  
  