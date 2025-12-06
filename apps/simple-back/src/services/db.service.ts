import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const options = {
  dialect: PostgresDialect,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: true,
  clientMinMessages: 'notice',    
};

export default new Sequelize(options);