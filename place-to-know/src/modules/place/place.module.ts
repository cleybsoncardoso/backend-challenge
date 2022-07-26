import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../country/entity/country.entity';
import { Place } from './entity/place.entity';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Country])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
