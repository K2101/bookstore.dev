import { kafka } from '../../kafka-wrapper';
import { Book } from '../../models/bookModel';

const bookCreatedListener = async () => {
  const bookCreatedConsumer = kafka.consumer({
    groupId: 'order-book-created-consume-group',
  });

  await bookCreatedConsumer.connect();
  await bookCreatedConsumer.subscribe({ topic: 'book-created' });
  const consume = async () => {
    await bookCreatedConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const {
          id,
          title,
          price,
          quantity,
          author,
          type,
          weight,
          isbnTenNumber,
        } = JSON.parse(message.value.toString());
        const book = await Book.build({
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
        console.log('book-created Consume 🔥');
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { bookCreatedListener };
