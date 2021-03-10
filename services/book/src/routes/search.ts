import { Request, Response, Router } from 'express';
import { elasticSearchClient } from '../elasticsearch';

const router = Router();

router.get('/api/books/search', async (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q) {
    return res.send({});
  }

  const { body } = await elasticSearchClient.search({
    index: 'books',
    body: {
      size: 5,
      query: {
        query_string: {
          query: `*${q}*`,
          fields: ['title', 'author'],
        },
      },
    },
  });

  const books = body.hits.hits;

  res.send(books);
});

export { router as searchBookRouter };
