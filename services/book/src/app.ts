import express from 'express';
import 'express-async-errors';
import './services/cache';

import { searchBookRouter } from './routes/search';
import { indexBookRouter } from './routes/index';
import { showBookRouter } from './routes/show';
import { createBookRouter } from './routes/new';
import { updateBookRouter } from './routes/update';
import { deleteBookRouter } from './routes/delete';
// import { uploadBookCoverRouter } from './routes/upload';
import { notFound } from './common/middlewares/not-found';
import { errorHandler } from './common/middlewares/error-handler';

const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use(searchBookRouter);
app.use(indexBookRouter);
app.use(showBookRouter);
app.use(createBookRouter);
app.use(updateBookRouter);
app.use(deleteBookRouter);
// app.use(uploadBookCoverRouter);

app.all('*', notFound);
app.use(errorHandler);

export { app };
