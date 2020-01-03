import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '192h',
  });
  return token;
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: '192h',
  });
  return decoded;
};
