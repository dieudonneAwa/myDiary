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
}

export default RecordController;
