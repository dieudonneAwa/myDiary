import Auth from '../middlewares/Auth';
import AuthController from '../controllers/AuthController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to my Diary API' });
  });

  app.post('/api/v1/auth/sign_up', Auth.validateSignUp, AuthController.signUp);
};

export default routes;
