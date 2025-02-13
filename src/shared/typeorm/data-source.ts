import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.DATABASE_PORT
  ? Number(process.env.DATABASE_PORT)
  : undefined;


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: port,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: ['./src/modules/**/database/entities/*.{ts, js}'],
  migrations: ['./src/shared/typeorm/migrations/*.{ts, js}'],
});
