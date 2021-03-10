import { Request, Response, Router } from 'express';
import { NotFoundError } from '../common/errors/not-found-error';
import { Book } from '../models/bookModel';
import { cleanCache } from '../common/middlewares/clean-cache';

const router = Router();

router.delete(
  '/api/books/:id',
  cleanCache,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      throw new NotFoundError();
    }

    // Publisher book that is deleting

    res.send(book);
  }
);

export { router as deleteBookRouter };
