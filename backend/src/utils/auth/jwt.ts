import jwt from 'jsonwebtoken'
import EnvVariables from '../loadEnv';
import { AuthTokenI } from '../../types/auth/auth';

export const generateToken = ({ id, type }: AuthTokenI): string => jwt.sign({ id, type }, EnvVariables.JWT_SECRET, { expiresIn: '7d' })

export const verifyToken = (token: string): AuthTokenI | null => {
  try {
    return jwt.verify(token, EnvVariables.JWT_SECRET) as AuthTokenI
  } catch (_error) {
    return null;
  }
}