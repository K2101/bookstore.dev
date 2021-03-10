import express, { Request, Response } from 'express';
import { validateBody } from '../services/validateBody';
import { validateRequest } from '../common/middlewares/validate-request';
import { Book } from '../models/bookModel';
import { producer } from '../kafka-wrapper';
import { elasticSearchClient } from '../elasticsearch';

const router = express.Router();

// const requireAuth = {};

router.post(
  '/api/books',
  validateBody,
  validateRequest,
  async (req: Request, res: Response) => {
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

    const book = Book.build({
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
    });
    await book.save();

    const bookSerialize = JSON.stringify(book);
    await producer.send({
      topic: 'book-created',
      messages: [{ value: bookSerialize }],
    });
    console.log('book-created Produce 🔥');

    // index to elasticsearch
    await elasticSearchClient.index({
      index: 'books',
      id: book._id,
      body: {
        title: book.title,
        author: book.author,
      },
    });

    await elasticSearchClient.indices.refresh({ index: 'books' });

    res.status(201).send(book);
  }
);

export { router as createBookRouter };
