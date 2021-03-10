import { producer } from '../../kafka-wrapper';

const orderUpdatedPublisher = async (order: any) => {
  const orderSerialize = JSON.stringify(order);
  await producer.send({
    topic: 'order-updated',
    messages: [{ value: orderSerialize }],
  });
  console.log('order-updated Produce 🔥');
};

export { orderUpdatedPublisher };
