import { UserRepo } from '../repositories';

const validator = require('validator');

export class Auth {
  static async validateSignUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        return res.status(400).send({ status: 'error', error: 'Name is required' });
      }
      if (!email) {
        return res.status(400).send({ status: 'error', error: 'Email is required' });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).send({ status: 'error', error: 'Invalide email' });
      }
      if (!password) {
        return res.status(400).send({ status: 'error', error: 'Password is required' });
      }
      const user = await UserRepo.getByEmail(email);
      if (user) {
        return res.status(409).send({ status: 'error', error: 'Email exist already' });
      }
      return next();
    } catch (e) {
      return next(new Error(e));
    }
  }
}
