import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { CountryModule } from './modules/country/country.module';
import { PlaceModule } from './modules/place/place.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CountryModule,
    PlaceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
