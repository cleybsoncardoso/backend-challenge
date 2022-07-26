import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterConfig } from '../../config/multer.config';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country } from './entity/country.entity';

@Module({
  imports: [
    MulterModule.register(MulterConfig),
    TypeOrmModule.forFeature([Country]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
