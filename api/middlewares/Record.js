import { DiaryRepo } from '../repositories';

export class Record {
  static async validateCreate(req, res, next) {
    try {
      const { title, text } = req.body;
      if (!title) {
        return res.status(400).send({ status: 'error', error: 'Title is required' });
      }
      if (!text) {
        return res.status(400).send({ status: 'error', error: 'Text is required' });
      }
      const diary = await DiaryRepo.getOne(req.params.diaryId);
      if (!diary) {
        return res.status(400).send({ status: 'error', error: 'Diary with given id not found' });
      }
      return next();
    } catch (e) {
      return next(new Error(e));
    }
  }
}
