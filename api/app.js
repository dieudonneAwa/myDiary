import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));

routes(app);

export default app;
