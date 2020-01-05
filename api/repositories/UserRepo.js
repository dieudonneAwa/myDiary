import models from '../database/models';

const { User } = models;

/**
 * @class UserRepo
 */
export class UserRepo {
  /**
   *
   * @param {object} user
   * @returns {object} returns a user object
   */
  static async createUser({ name, email, password }) {
    try {
      const data = await User.create({ name, email, password });
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
      const data = await User.findOne({ where: { email } });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
