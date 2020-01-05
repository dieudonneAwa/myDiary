export class Diary {
  static validateCreate({ body }, res, next) {
    const { name } = body;
    if (!name) {
      return res.status(400).send({ status: 'error', error: 'Diary name is required' });
    }
    return next();
  }
}
