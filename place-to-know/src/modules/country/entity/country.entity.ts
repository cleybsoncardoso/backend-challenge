import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Place } from '../../place/entity/place.entity';

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary do país', example: '1' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'nome do país', example: 'Brasil' })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'path da bandeira',
    example: 'public/12321.jpeg',
  })
  fileUrl: string;

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

  @OneToMany(() => Place, (place) => place.country)
  places: Place[];
}
