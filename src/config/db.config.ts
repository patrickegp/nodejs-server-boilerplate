import envConfig from './env.config'; 
import { drizzle } from "drizzle-orm/mysql2";
import mysql, { PoolOptions } from "mysql2/promise";

const {mysql: sql } = envConfig;

// MAMP socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
const options: PoolOptions = {
  user: sql.user,
  password: sql.password,
  host: sql.host,
  database: sql.database,
  port: sql.port
}

const conn = mysql.createPool(options);
export const db = drizzle({client: conn});