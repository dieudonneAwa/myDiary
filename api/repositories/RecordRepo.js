import models from '../database/models';

const { Record } = models;
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
}

export default RecordRepo;
