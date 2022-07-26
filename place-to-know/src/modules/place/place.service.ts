import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Country } from '../country/entity/country.entity';
import { CreatePlaceDTO } from './dto/createPlace.dto';
import { UpdatePlaceDTO } from './dto/updatePlace.dto';
import { Place } from './entity/place.entity';
import { CompanyNotFoundException } from './exceptions/CompanyNotFound.exception';
import { PlaceExistException } from './exceptions/PlaceExist.exception';
import { PlaceNotFoundException } from './exceptions/PlaceNotFound.exception';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}
  async create(placeDto: CreatePlaceDTO): Promise<Place> {
    const country = await this.countryRepository.findOneBy({
      id: placeDto.countryId,
    });
    const existPlace = await this.existeSamePlace(
      placeDto.location,
      placeDto.countryId,
      0,
    );
    if (existPlace) {
      throw new PlaceExistException();
    }
    if (!country) {
      throw new CompanyNotFoundException();
    }
    const goal = this.separeteDate(placeDto.goal);
    return this.placeRepository.save({
      ...placeDto,
      goalMonth: goal.month,
      goalYear: goal.year,
      country: {
        id: placeDto.countryId,
      },
    });
  }

  all(): Promise<Place[]> {
    return this.placeRepository
      .createQueryBuilder()
      .addOrderBy('Place.goalYear', 'DESC')
      .addOrderBy('Place.goalMonth', 'DESC')
      .getMany();
  }

  async update(placeId: number, placeDto: UpdatePlaceDTO): Promise<Place> {
    const placeFound = await this.placeRepository.findOne({
      where: { id: placeId },
      relations: ['country'],
    });

    if (!placeFound) {
      throw new PlaceNotFoundException();
    }

    const existPlace = await this.existeSamePlace(
      placeDto.location,
      placeFound.country.id,
      placeFound.id,
    );
    if (existPlace) {
      throw new PlaceExistException();
    }

    const goal = this.separeteDate(placeDto.goal);
    placeFound.goalYear = goal.year;
    placeFound.goalMonth = goal.month;
    placeFound.location = placeDto.location;
    await placeFound.save();
    return placeFound;
  }

  private async existeSamePlace(
    location: string,
    country: number,
    currentPlace: number,
  ): Promise<boolean> {
    const placeFound = await this.placeRepository.findOne({
      where: {
        location,
        country: {
          id: country,
        },
        id: Not(currentPlace),
      },
    });
    return !!placeFound;
  }

  private separeteDate(goal: string): { month: number; year: number } {
    const [monthRaw, yearRaw] = goal.split('/');
    const month = parseInt(monthRaw);
    const year = parseInt(yearRaw);
    return {
      month,
      year,
    };
  }
}
