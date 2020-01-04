import Auth from '../middlewares/Auth';
import AuthController from '../controllers/AuthController';
import DiaryController from '../controllers/DiaryController';
import authorize from '../middlewares/authorize';
import Diary from '../middlewares/Diary';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to my Diary API' });
  });

  app.post('/api/v1/auth/sign_up', Auth.validateSignUp, AuthController.signUp);
  app.post('/api/v1/auth/sign_in', AuthController.signIn);

  app.post('/api/v1/diaries', Diary.validateCreate, authorize, DiaryController.creatDiary);
};

export default routes;
