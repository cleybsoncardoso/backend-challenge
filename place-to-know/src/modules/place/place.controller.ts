import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePlaceDTO } from './dto/createPlace.dto';
import { UpdatePlaceDTO } from './dto/updatePlace.dto';
import { Place } from './entity/place.entity';
import { PlaceService } from './place.service';

@Controller('place')
@ApiTags('Place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Post()
  @ApiOperation({ summary: 'criar um lugar para visitar' })
  @ApiBody({ type: CreatePlaceDTO })
  @ApiOkResponse({ type: Place })
  store(@Body() placeDTO: CreatePlaceDTO): Promise<Place> {
    return this.placeService.create(placeDTO);
  }

  @Put(':id')
  @ApiOperation({ summary: 'atualizar o lugar ou data da visita' })
  @ApiParam({
    name: 'id',
    description: 'Id do lugar',
    example: 1,
    type: 'number',
  })
  @ApiBody({ type: UpdatePlaceDTO })
  @ApiOkResponse({ type: Place })
  update(
    @Param('id') placeId: number,
    @Body() placeDTO: UpdatePlaceDTO,
  ): Promise<Place> {
    return this.placeService.update(placeId, placeDTO);
  }

  @Get()
  @ApiOperation({ summary: 'atualizar o lugar ou data da visita' })
  @ApiOkResponse({ type: Place, isArray: true })
  index(): Promise<Place[]> {
    return this.placeService.all();
  }
}
