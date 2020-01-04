import { DiaryRepo } from '../repositories';

class DiaryController {
  static async creatDiary({ body, user }, res, next) {
    try {
      const { name, description } = body;
      const diary = await DiaryRepo.create({ name, description, userId: user.id });
      return res.status(201).send({ status: 'success', data: { diary: diary.dataValues } });
    } catch (e) {
      return next(new Error(e));
    }
  }

  static async getAllDiaries(req, res, next) {
    try {
      const diaries = await DiaryRepo.getAll(req.user.id);
      return res.status(200).send({ status: 'success', data: { diaries } });
    } catch (e) {
      return next(new Error(e));
    }
  }

  static async getDiary({ params }, res, next) {
    try {
      const diary = await DiaryRepo.getOne(params.diaryId);
      if (!diary) {
        return res.status(400).send({ status: 'error', error: 'Invalid diaryId' });
      }
      return res.status(200).send({ status: 'success', data: { diary } });
    } catch (e) {
      return next(new Error(e));
    }
  }
}

export default DiaryController;
