import { UserRepo } from '../repositories';

export class UserController {
  static async getUserProfile(req, res, next) {
    try {
      const user = await UserRepo.getByEmail(req.params.email);
      if (!user) {
        return res.status(404).send({ status: 'error', error: 'User with email not found' });
      }
      return res.status(200).send({ status: 'success', data: { profile: user } });
    } catch (e) {
      return next(new Error(e));
    }
  }
}
