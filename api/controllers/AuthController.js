import { UserRepo } from '../repositories';
import { createToken } from '../modules/jwt';

class AuthController {
  static async signUp(req, res, next) {
    try {
      const user = await UserRepo.createUser(req.body);
      const token = createToken(user);
      return res.status(201).send({ status: 'success', data: { user, token } });
    } catch (e) {
      return next(new Error(e));
    }
  }
}

export default AuthController;
