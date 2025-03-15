import envConfig from '../config/env.config';

import jwt, { SignOptions, VerifyErrors, JwtPayload } from 'jsonwebtoken';

const {jwt: jwtEnv } = envConfig;

export function generateAccessToken(payload: object, options?: SignOptions): string {
  const signOptions: SignOptions = {
    expiresIn: '15m',
    ...options,
  };
  return jwt.sign(payload, jwtEnv.accessKey, signOptions);
}

export function generateRefreshToken(payload: object, options?: SignOptions): string {
  const signOptions: SignOptions = {
    expiresIn: '7d',
    ...options,
  };
  return jwt.sign(payload, jwtEnv.refreshKey, signOptions);
}

export function verifyAccessToken(token: string): JwtPayload | string {
  try {
    return jwt.verify(token, jwtEnv.accessKey);
  } catch (error) {
    throw new Error(`Invalid access token: ${(error as VerifyErrors).message}`);
  }
}

export function verifyRefreshToken(token: string): JwtPayload | string {
  try {
    return jwt.verify(token, jwtEnv.refreshKey);
  } catch (error) {
    throw new Error(`Invalid refresh token: ${(error as VerifyErrors).message}`);
  }
}

export function decodeToken(token: string): null | { [key: string]: any } | string {
  return jwt.decode(token);
}
