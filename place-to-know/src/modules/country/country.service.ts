import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDTO } from './dto/createCountry.dto';
import { Country } from './entity/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  create(country: CreateCountryDTO, fileUrl: string): Promise<Country> {
    return this.countryRepository.save({ ...country, fileUrl });
  }

  all(): Promise<Country[]> {
    return this.countryRepository.find({ select: ['id', 'name', 'fileUrl'] });
  }
}
