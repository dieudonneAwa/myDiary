import models from '../database/models';

const { User } = models;

/**
 * @class UserRepo
 */
class UserRepo {
  /**
   *
   * @param {object} user
   * @returns {object} returns a user object
   */
  static async createUser({ name, email, password }) {
    try {
      const { dataValues } = await User.create({ name, email, password });
      return dataValues;
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
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default UserRepo;
