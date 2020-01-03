import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

export const createToken = ({ id, name, email }) => jwt.sign(
  { id, name, email },
  process.env.JWT_SECRET, {
    expiresIn: '48h',
  },
);

export const verifyToken = (token) => jwt.verify(
  token,
  process.env.JWT_SECRET, {
    expiresIn: '48h',
  },
);
