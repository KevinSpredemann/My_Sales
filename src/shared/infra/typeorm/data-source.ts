import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const port = process.env.DATABASE_PORT
  ? Number(process.env.DATABASE_PORT)
  : undefined;

const baseDateSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: port,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: ['./src/modules/**/infra/database/entities/*.{ts, js}'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.{ts, js}'],
};

const appTestDataSourceOptions: DataSourceOptions = {
  ...baseDateSourceOptions,
  database: process.env.DB_NAME_TEST,
};

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? appTestDataSourceOptions
    : baseDateSourceOptions,
);
