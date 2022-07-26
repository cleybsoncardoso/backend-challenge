import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { CustomGoalDate } from './goal.validator';

export class UpdatePlaceDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'nome do local', example: 'Mercado de Artes' })
  @ApiProperty()
  @MaxLength(255)
  location: string;

  @Validate(CustomGoalDate)
  @IsNotEmpty()
  @ApiProperty({ description: 'mês e ano esperado', example: '08/2022' })
  @ApiProperty()
  goal: string;
}
