import {
  authorize, Diary, Record, Auth,
} from '../middlewares';
import { RecordController, AuthController, DiaryController } from '../controllers';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to my Diary API' });
  });

  app.post('/api/v1/auth/sign_up', Auth.validateSignUp, AuthController.signUp);
  app.post('/api/v1/auth/sign_in', AuthController.signIn);

  app.post('/api/v1/diaries', authorize, Diary.validateCreate, DiaryController.creatDiary);
  app.get('/api/v1/diaries', authorize, DiaryController.getAllDiaries);
  app.get('/api/v1/diaries/:diaryId', authorize, DiaryController.getDiary);

  app.post('/api/v1/diaries/:diaryId/records', authorize, Record.validateCreate, RecordController.createRecord);
  app.get('/api/v1/diaries/:diaryId/records', authorize, RecordController.getRecords);
  app.get('/api/v1/diaries/:diaryId/records/:recordId', authorize, RecordController.getRecord);
};

export default routes;
