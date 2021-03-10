import express from 'express';
import 'express-async-errors';

import { notFound } from './common/middlewares/not-found';
import { errorHandler } from './common/middlewares/error-handler';
import { currentUser } from './common/middlewares/current-user';
import { createAndUpdateCustomerInfoRoute } from './routes/get-new-update';

const app = express();
app.set('trust proxy', true);
app.use(express.json());

app.use(currentUser);

app.use(createAndUpdateCustomerInfoRoute);

app.all('*', notFound);
app.use(errorHandler);

export { app };
