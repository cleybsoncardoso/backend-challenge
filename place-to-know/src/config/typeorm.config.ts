import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
const DATABASE_TYPE: any = String(process.env.DB_TYPE) || 'mysql';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: () => ({
    type: DATABASE_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: true,
    logging: true,
  }),
};
