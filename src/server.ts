import envConfig from './config/env.config'; 
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './api/auth/auth.routes';
import usersRoutes from './api/users/users.routes';

const app: Application = express();

const { app: env } = envConfig;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control'],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
