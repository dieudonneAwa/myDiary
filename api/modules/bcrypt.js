import bcrypt from 'bcryptjs';

export const hash = (password) => bcrypt.hashSync(password, 10);
export const unHash = (password, hashed) => bcrypt.compareSync(password, hashed);
