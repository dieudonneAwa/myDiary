import { UserRepo } from '../repositories';
import { createToken, hash, unHash } from '../modules';

export class AuthController {
  static async signUp({ body }, res, next) {
    try {
      const {
        name, email, password, imgUrl,
      } = body;
      const hashedPasswd = await hash(password);
      const user = await UserRepo.createUser({
        name, email, password: hashedPasswd, imgUrl,
      });
      const { dataValues } = user;
      const { id } = dataValues;
      const token = createToken(dataValues);
      return res.status(201).send(
        {
          status: 'success',
          data: {
            user: {
              id, name, email, imgUrl,
            },
            token,
          },
        },
      );
    } catch (e) {
      return next(new Error(e));
    }
  }

  static async signIn({ body }, res, next) {
    try {
      const { email, password } = body;
      const user = await UserRepo.getByEmail(email);
      if (user) {
        const { dataValues } = user;
        const token = createToken(dataValues);
        if (unHash(password, dataValues.password)) {
          const { id, name, imgUrl } = dataValues;
          return res.status(200).send({
            status: 'success',
            data: {
              user: {
                id, email, name, imgUrl,
              },
              token,
            },
          });
        }
      }
      return res.status(400).send({ status: 'error', error: 'Wrong email/password combination' });
    } catch (e) {
      return next(new Error(e));
    }
  }
}
