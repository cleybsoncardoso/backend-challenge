import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCountryDTO {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(255)
  name: string;
}
