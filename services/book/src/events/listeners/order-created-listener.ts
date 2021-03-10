import { producer, kafka } from '../../kafka-wrapper';
import { Book } from '../../models/bookModel';

const orderCreatedListener = async () => {
  const orderCreatedConsumer = kafka.consumer({
    groupId: 'book-order-created-consume-group',
  });

  await orderCreatedConsumer.connect();
  await orderCreatedConsumer.subscribe({ topic: 'order-created' });
  const consume = async () => {
    await orderCreatedConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const booksFromOrderCreated = JSON.parse(message.value.toString());

        const ids = booksFromOrderCreated.books.map((book: any) => {
          return { _id: book._id, quantity: book.amountOfBuyingBook };
        });

        const books = await Book.find().where('_id').in(ids).exec();

        for (let i = 0; i < books.length; i++) {
          const updatedQuantity = (books[i].quantity =
            books[i].quantity - ids[i].quantity);

          books[i].set({ quantity: updatedQuantity });
          await books[i].save();
        }

        console.log('order-created Consume 🔥');

        const updatedQuantityBooks = await Book.find()
          .where('_id')
          .in(ids)
          .exec();

        for (let i = 0; i < updatedQuantityBooks.length; i++) {
          const bookSerialize = JSON.stringify(updatedQuantityBooks[i]);
          await producer.send({
            topic: 'book-updated',
            messages: [{ value: bookSerialize }],
          });
          console.log('book-updated Loop? Produce 🔥');
        }
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { orderCreatedListener };
