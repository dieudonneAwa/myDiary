import models from '../database/models';

const { Diary } = models;

class DiaryRepo {
  static async create({ name, description, userId }) {
    try {
      const data = await Diary.create({ name, description, userId });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getOne(id) {
    try {
      const data = await Diary.findByPk(id);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default DiaryRepo;
