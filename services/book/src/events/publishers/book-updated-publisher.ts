import { producer } from '../../kafka-wrapper';

const bookUpdatedPublisher = async (book: any) => {
  const bookSerialize = JSON.stringify(book);

  await producer.send({
    topic: 'book-updated',
    messages: [{ value: bookSerialize }],
  });
  console.log('book-updated Produce 🔥');
};

export { bookUpdatedPublisher };
