import models from '../database/models';

const { Record, Diary } = models;

class RecordRepo {
  static async create({
    title, text, location, diaryId,
  }) {
    try {
      const record = await Record.create({
        title, text, location, diaryId,
      });
      return record;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getOne(recordId, diaryId, userId) {
    try {
      const data = await Record.findOne({
        where: { id: recordId, diaryId },
        include: [{
          model: Diary,
          as: 'diary',
          where: { userId },
          required: false,
          attributes: ['id', 'name', 'userId'],
        }],
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAll(diaryId) {
    try {
      const records = await Record.findAll({
        where: { diaryId },
        include: [{
          model: Diary,
          as: 'diary',
          attributes: ['id', 'name', 'userId'],
        }],
      });
      return records;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default RecordRepo;
