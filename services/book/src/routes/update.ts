import { Request, Response, Router } from 'express';
import { NotFoundError } from '../common/errors/not-found-error';
import { Book } from '../models/bookModel';
import { producer } from '../kafka-wrapper';
import { cleanCache } from '../common/middlewares/clean-cache';
import { elasticSearchClient } from '../elasticsearch';

const router = Router();

router.put(
  '/api/books/:id',
  cleanCache,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      throw new NotFoundError();
    }
    const {
      title,
      price,
      description,
      quantity,
      author,
      publisher,
      type,
      pages,
      weight,
      language,
      isbnTenNumber,
    } = req.body;

    book.set({
      title: title || book.title,
      price: price || book.price,
      description: description || book.description,
      quantity: quantity || book.quantity,
      author: author || book.author,
      publisher: publisher || book.publisher,
      type: type || book.type,
      pages: pages || book.pages,
      weight: weight || book.weight,
      language: language || book.language,
      isbnTenNumber: isbnTenNumber || book.isbnTenNumber,
    });

    await book.save();

    const bookSerialize = JSON.stringify(book);

    await producer.send({
      topic: 'book-updated',
      messages: [{ value: bookSerialize }],
    });
    console.log('book-updated Produce 🔥');

    // update to elasticsearch
    await elasticSearchClient.index({
      index: 'books',
      id: book._id,
      body: {
        title: book.title,
        author: book.author,
      },
    });

    await elasticSearchClient.indices.refresh({ index: 'books' });

    res.send(book);
  }
);

export { router as updateBookRouter };
