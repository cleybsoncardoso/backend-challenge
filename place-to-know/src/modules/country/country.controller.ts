import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryDTO } from './dto/createCountry.dto';
import { Country } from './entity/country.entity';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'criar um país' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'nome do país' },
        file: {
          type: 'string',
          format: 'binary',
          description: 'foto da bandeira',
        },
      },
    },
  })
  @ApiOkResponse({ type: Country })
  @UseInterceptors(FileInterceptor('file'))
  store(
    @Body() countryDTO: CreateCountryDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'jpeg|png|jpg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.countryService.create(countryDTO, file.path);
  }

  @Get()
  @ApiOperation({ summary: 'listar os paises cadastrados' })
  @ApiOkResponse({ type: Country, isArray: true })
  index(): Promise<Country[]> {
    return this.countryService.all();
  }
}
