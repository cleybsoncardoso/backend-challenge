import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Unique,
  AfterLoad,
} from 'typeorm';
import { Country } from '../../country/entity/country.entity';

@Entity('places')
export class Place extends BaseEntity {
  @ApiProperty({ description: 'mês e ano esperado', example: '08/2022' })
  goal: string;

  @ApiProperty({
    description: 'primary do lugar',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'nome do local', example: 'Mercado de Artes' })
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Unique('unique-location-country', ['location', 'countryId'])
  location: string;

  @ApiProperty({ description: 'mês que pretende visitar o local', example: 8 })
  @Column({
    type: 'int',
  })
  goalMonth: number;

  @ApiProperty({
    description: 'ano que pretende visitar o local',
    example: 2022,
  })
  @Column({
    type: 'int',
  })
  goalYear: number;

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;

  @CreateDateColumn()
  @ApiProperty({
    description: 'datetime de criação',
    example: '2022-07-25 22:48:52',
  })
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'datetime da ultima atualização',
    example: '2022-07-25 22:48:52',
  })
  updatedAt!: Date;

  @DeleteDateColumn()
  @ApiProperty({
    description: 'datetime de remoção',
    example: null,
  })
  deletedAt?: Date | null;

  @AfterLoad()
  updateCounters() {
    this.goal = `${('0' + this.goalMonth).slice(-2)}/${this.goalYear}`;
  }
}
