import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from the .env file
dotenv.config();

// Define types for configuration sections
interface AppConfig {
  name: string;
  port: number;
  origins: string;
  email: string;
}

interface JwtConfig {
  accessKey: string;
  refreshKey: string;
  duration: string;
}

interface MysqlConfig {
  socket: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}

interface Config {
  app: AppConfig;
  jwt: JwtConfig;
  mysql: MysqlConfig;
  smtp: SmtpConfig;
}

const getEnvVariable = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Warning: Missing environment variable ${key}, using default value.`);
    return defaultValue;
  }
  return value;
};

const loadConfig = (): Config => {
  return {
    app: {
      name: getEnvVariable('APP_NAME', 'NodeJS Starter'),
      port: parseInt(getEnvVariable('APP_PORT', '8080'), 10),
      origins: getEnvVariable('APP_ORIGINS', 'http://localhost:5173'),
      email: getEnvVariable('APP_EMAIL', 'noreply@gesystec.com')
    },
    jwt: {
      accessKey: getEnvVariable('JWT_ACCESS_KEY', 'default-access-key'),
      refreshKey: getEnvVariable('JWT_REFRESH_KEY', 'default-refresh-key'),
      duration: getEnvVariable('JWT_SECRET_DURATIONN', '15m')
    },
    mysql: {
      socket: getEnvVariable('MYSQL_SOCKET', '/Applications/MAMP/tmp/mysql/mysql.sock'),
      host: getEnvVariable('MYSQL_HOST', '127.0.0.1'),
      port: parseInt(getEnvVariable('MYSQL_PORT', '3306'), 10),
      database: getEnvVariable('MYSQL_DATABASE', 'factura_v2_db'),
      user: getEnvVariable('MYSQL_USER', 'root'),
      password: getEnvVariable('MYSQL_PASSWORD', 'root')
    },
    smtp: {
      host: getEnvVariable('SMTP_HOST', ''),
      port: parseInt(getEnvVariable('SMTP_PORT', '0'), 10),
      user: getEnvVariable('SMTP_USER', ''),
      password: getEnvVariable('SMTP_PASSWORD', '')
    }
  };
};

const env = loadConfig();
export default env;
