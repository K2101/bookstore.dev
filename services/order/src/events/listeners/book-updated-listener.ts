import { kafka } from '../../kafka-wrapper';
import { Book } from '../../models/bookModel';

const bookUpdatedListener = async () => {
  const bookUpdateConsume = kafka.consumer({
    groupId: 'order-book-updated-consume-group',
  });

  await bookUpdateConsume.connect();
  await bookUpdateConsume.subscribe({ topic: 'book-updated' });
  const consume = async () => {
    await bookUpdateConsume.run({
      eachMessage: async ({ topic, partition, message }) => {
        const bookUpdatedData = JSON.parse(message.value.toString());

        const book = await Book.findByEvent(bookUpdatedData);

        if (!book) {
          throw new Error('Book not found');
        }

        const {
          id,
          title,
          price,
          quantity,
          author,
          type,
          weight,
          isbnTenNumber,
        } = bookUpdatedData;

        book.set({
          id,
          title,
          price,
          quantity,
          author,
          type,
          weight,
          isbnTenNumber,
        });

        await book.save().catch((err) => console.log(err));
        console.log('book-updated Consume 🔥');
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { bookUpdatedListener };
