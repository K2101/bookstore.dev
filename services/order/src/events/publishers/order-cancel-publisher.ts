import { producer } from '../../kafka-wrapper';

const orderCancelledPublisher = async (order: any) => {
  const orderSerialize = JSON.stringify(order);
  await producer.send({
    topic: 'order-cancelled',
    messages: [{ value: orderSerialize }],
  });
  console.log('order-cancelled Produce 🔥');
};

export { orderCancelledPublisher };
