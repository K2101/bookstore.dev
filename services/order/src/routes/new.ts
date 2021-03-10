import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import { Book, BookDoc, BookTypes } from '../models/bookModel';
import { Order, OrderDoc } from '../models/orderModel';
import { validateRequest } from '../common/middlewares/validate-request';
import { NotFoundError } from '../common/errors/not-found-error';
import { BadRequestError } from '../common/errors/bad-request-error';
import { requireAuth } from '../common/middlewares/require-auth';
import { producer } from '../kafka-wrapper';

const exampleBookForTestFunctional = async () => {
  const book0 = Book.build({
    id: '0fec2252c14352001e7d4b5c',
    title: 'book1',
    price: 100,
    quantity: 5,
    weight: 10.5,
    author: 'Tony',
    type: BookTypes.kindle,
  });
  const book1 = Book.build({
    id: '1fec2252c14352001e7d4b5c',
    title: 'book1',
    price: 200,
    quantity: 5,
    weight: 10.5,
    author: 'Tony',
    type: BookTypes.kindle,
  });
  const book2 = Book.build({
    id: '2fec2252c14352001e7d4b5c',
    title: 'book1',
    price: 300,
    quantity: 5,
    weight: 10.5,
    author: 'Tony',
    type: BookTypes.kindle,
  });
  const book3 = Book.build({
    id: '3fec2252c14352001e7d4b5c',
    title: 'book1',
    price: 300,
    quantity: 0,
    weight: 10.5,
    author: 'Tony',
    type: BookTypes.kindle,
  });
  const book6 = Book.build({
    id: '6fec2252c14352001e7d4b5c',
    title: 'book1',
    price: 300,
    quantity: 0,
    weight: 10.5,
    author: 'Tony',
    type: BookTypes.kindle,
  });

  const book7 = Book.build({
    id: '7fec2252c14352001e7d4b5c',
    title: 'book1',
    price: 1000,
    quantity: 5,
    weight: 10.5,
    author: 'Tony',
    type: BookTypes.kindle,
  });

  await book0.save();
  await book1.save();
  await book2.save();
  await book3.save();
  await book6.save();
  await book7.save();

  console.log(await Book.find({}));

  //   {
  //     "orderLists": [
  //         {
  //             "bookId": "2fec2252c14352001e7d4b5c",
  //             "qty": 5
  //         },
  //         {
  //             "bookId": "0fec2252c14352001e7d4b5c",
  //             "qty": 2
  //         },
  //         {
  //             "bookId": "1fec2252c14352001e7d4b5c",
  //             "qty": 3
  //         },
  //         {
  //             "bookId": "7fec2252c14352001e7d4b5c",
  //             "qty": 1
  //         }
  //     ]
  // }
};

const router = Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('orderLists')
      .not()
      .isEmpty()
      .withMessage('orderLists must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderLists } = req.body;

    // exampleBookForTestFunctional();

    const checkId = (book: any) => {
      return !mongoose.Types.ObjectId.isValid(book.bookId);
    };

    const invalidId = orderLists.some(checkId);

    if (invalidId) {
      throw new BadRequestError('bookId are invalid');
    }

    // Parse orderLists to array of id
    const ids = orderLists.map((orderlist: any) => {
      return orderlist.bookId;
    });
    // console.log('ids', ids);

    // Find array of ids that client gonna buy in DB
    const books = await Book.find().where('_id').in(ids).exec();
    // console.log(books);

    // Return id and title of the book that not found in DB
    const notFoundBooks = ids.filter((id: string) => {
      return !books
        .map((book: BookDoc) => {
          return book._id;
        })
        .includes(id);
    });

    // console.log('notFoundBooks', notFoundBooks);

    if (notFoundBooks.length) {
      throw new NotFoundError({
        notFoundBooks,
      });
    }

    // console.log(orderLists);
    // console.log(books);
    const sortOrdersBeforeCalQTY = books
      .map((book: BookDoc) => {
        return orderLists.filter((order: any) => book._id === order.bookId);
      })
      .flat();

    const outOfStockBooks = books.filter((book: BookDoc, index: number) => {
      return book.quantity <= 0;
    });

    const notEnoughBooksInStock = books.filter(
      (book: BookDoc, index: number) => {
        return book.quantity < sortOrdersBeforeCalQTY[index].qty;
      }
    );

    const parseOutOfStockInfo = outOfStockBooks.map((book: BookDoc) => {
      return { id: book._id, title: book.title };
    });

    const parseNotEnoughBooksInStock = notEnoughBooksInStock.map(
      (book: BookDoc) => {
        return {
          id: book._id,
          title: book.title,
          currentInStock: book.quantity,
        };
      }
    );

    if (outOfStockBooks.length) {
      throw new BadRequestError({
        outOfStockBooks: parseOutOfStockInfo,
      });
    }

    if (notEnoughBooksInStock.length) {
      throw new BadRequestError({
        notEnoughBooksInStock: parseNotEnoughBooksInStock,
      });
    }

    // Calculate order details section
    const weight = books.reduce(
      (acc: number, cur: OrderDoc) => acc + cur.weight,
      0
    );

    const amount = orderLists.reduce(
      (acc: number, cur: any) => acc + cur.qty,
      0
    );

    const sortOrdersBeforeCalPrice = books
      .map((book: BookDoc) => {
        return orderLists.filter((order: any) => book._id === order.bookId);
      })
      .flat();

    const priceByBook = books.map((book: BookDoc, index: number) => {
      return book.price * sortOrdersBeforeCalPrice[index].qty;
    });

    const totalPrice = priceByBook.reduce(
      (acc: number, cur: number) => acc + cur,
      0
    );

    // console.log(books);
    // console.log(sortOrdersBeforeCalPrice);
    const orderBooks = books.map((book: BookDoc, index: number) => {
      return {
        _id: book._id,
        title: book.title,
        price: book.price,
        amountOfBuyingBook: sortOrdersBeforeCalPrice[index].qty,
      };
    });

    const order = Order.build({
      userId: req.currentUser.id,
      status: 'await',
      totalPrice,
      amount,
      weight,
      books: orderBooks,
    });
    await order.save();

    const orderSerialize = JSON.stringify(order);
    await producer.send({
      topic: 'order-created',
      messages: [{ value: orderSerialize }],
    });
    console.log('order-created Produce 🔥');

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
