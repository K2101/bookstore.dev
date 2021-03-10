import { Request, Response, Router } from 'express';
import { NotFoundError } from '../common/errors/not-found-error';
import { Book } from '../models/bookModel';

const router = Router();

router.get('/api/books/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  // @ts-ignore
  const book = await Book.findById(id).cache({ key: id });

  if (!book?.price) {
    throw new NotFoundError();
  }

  if (!book) {
    throw new NotFoundError();
  }

  // next time ..._id???
  book._id = id;
  res.send(book);
});

export { router as showBookRouter };
