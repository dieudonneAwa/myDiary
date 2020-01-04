import RecordRepo from '../repositories/RecordRepo';

class RecordController {
  static async createRecord({ body, params }, res, next) {
    try {
      const { title, text, location } = body;
      const record = await RecordRepo.create({
        title, text, location, diaryId: params.diaryId,
      });
      return res.status(201).send({ status: 'success', data: { record: record.dataValues } });
    } catch (e) {
      return next(new Error(e));
    }
  }

  static async getRecords({ params }, res, next) {
    try {
      const records = await RecordRepo.getAll(params.diaryId);
      if (!records) {
        return res.status(400).send({ status: 'error', error: 'Invalid diaryId' });
      }
      return res.status(200).send({ status: 'success', data: { records } });
    } catch (e) {
      return next(new Error(e));
    }
  }
}

export default RecordController;
