import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { CustomGoalDate } from './goal.validator';

export class CreatePlaceDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'nome do local', example: 'Mercado de Artes' })
  @MaxLength(255)
  location: string;

  @Validate(CustomGoalDate)
  @IsNotEmpty()
  @ApiProperty({ description: 'mês e ano esperado', example: '08/2022' })
  goal: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'id do país', example: 1 })
  countryId: number;
}
