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
}

export default DiaryController;
