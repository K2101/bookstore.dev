import express, { Request, Response } from 'express';
import { NotFoundError } from '../common/errors/not-found-error';
import { Book } from '../models/bookModel';

const router = express.Router();

router.get('/api/books', async (req: Request, res: Response) => {
  const books = await Book.find({});

  if (!books) {
    throw new NotFoundError();
  }

  res.send(books);
});

export { router as indexBookRouter };
