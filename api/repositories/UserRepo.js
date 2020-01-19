import models from '../database/models';

const { User, Diary, Record } = models;

/**
 * @class UserRepo
 */
export class UserRepo {
  /**
   *
   * @param {object} user
   * @returns {object} returns a user object
   */
  static async createUser({
    name, email, password, imgUrl,
  }) {
    try {
      const data = await User.create({
        name, email, password, imgUrl,
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param {string} email
   * @returns {object} returns a user object
   */
  static async getByEmail(email) {
    try {
      const data = await User.findOne({
        where: { email },
        include: [{
          model: Diary,
          as: 'diaries',
          include: [{
            model: Record,
            as: 'records',
          }],
        }],
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
