import { producer, kafka } from '../../kafka-wrapper';
import { Book } from '../../models/bookModel';
import { bookUpdatedPublisher } from '../publishers/book-updated-publisher';

const orderCancelledListener = async () => {
  const orderCancelledConsummer = kafka.consumer({
    groupId: 'book-order-cancelled-consume-group',
  });

  await orderCancelledConsummer.connect();
  await orderCancelledConsummer.subscribe({ topic: 'order-cancelled' });
  const consume = async () => {
    await orderCancelledConsummer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const orderCancelledFromOrderService = JSON.parse(
          message.value.toString()
        );

        for (let i = 0; i < orderCancelledFromOrderService.books.length; i++) {
          const bookUpdatpQTY = await Book.findById(
            orderCancelledFromOrderService.books[i]._id
          );
          const qty =
            bookUpdatpQTY.quantity +
            orderCancelledFromOrderService.books[i].amountOfBuyingBook;

          bookUpdatpQTY.set({ quantity: qty });
          await bookUpdatpQTY.save();

          await bookUpdatedPublisher(bookUpdatpQTY);
          console.log('order-cancelled Consume 🔥');
        }
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { orderCancelledListener };
