import models from '../database/models';

const { Diary, Record } = models;

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
      const data = await Diary.findOne({
        where: { id },
        include: [{
          model: Record,
          as: 'records',
          attributes: ['id', 'title', 'text', 'location', 'diaryId'],
        }],
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAll(userId) {
    try {
      const diaries = await Diary.findAll({
        where: { userId },
        include: [{
          model: Record,
          as: 'records',
          attributes: ['id', 'title', 'location', 'diaryId'],
        }],
      });
      return diaries;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default DiaryRepo;
