import envConfig from './src/config/env.config';
import { defineConfig } from 'drizzle-kit';

const {mysql: sql } = envConfig;

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Entrar247?",
    database: "nodejs_db",
  },
});