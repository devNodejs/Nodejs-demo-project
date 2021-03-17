import 'babel-polyfill'
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import { handleError } from './middlewares/error.middleware';

const app = express();

app.use(cors({ exposedHeaders: ['X-Token', 'X-Powered-By'] }));
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
