import { verifyToken } from '../modules';
import { UserRepo } from '../repositories';

export const authorize = async (req, res, next) => {
  const rawToken = req.headers.authorization
    || req.headers['x-access-token']
    || req.body.token
    || req.query.slt;

  if (!rawToken) {
    return res.status(401).send({ status: 'error', error: 'Unauthorized' });
  }
  try {
    const token = rawToken.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await UserRepo.getByEmail(decoded.email);
    if (!user) {
      return res.status(403).send({ status: 'error', error: 'Forbidden' });
    }
    req.user = decoded;
    return next();
  } catch (e) {
    return next(new Error(e));
  }
};
