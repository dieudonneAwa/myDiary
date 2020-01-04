import Auth from '../middlewares/Auth';
import AuthController from '../controllers/AuthController';
import DiaryController from '../controllers/DiaryController';
import authorize from '../middlewares/authorize';
import Diary from '../middlewares/Diary';
import Record from '../middlewares/Record';
import RecordController from '../controllers/RecordController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to my Diary API' });
  });

  app.post('/api/v1/auth/sign_up', Auth.validateSignUp, AuthController.signUp);
  app.post('/api/v1/auth/sign_in', AuthController.signIn);

  app.post('/api/v1/diaries', authorize, Diary.validateCreate, DiaryController.creatDiary);

  app.post('/api/v1/diaries/:diaryId/records', authorize, Record.validateCreate, RecordController.createRecord);
};

export default routes;
