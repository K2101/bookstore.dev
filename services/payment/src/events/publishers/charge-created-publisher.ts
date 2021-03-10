import { producer } from '../../kafka-wrapper';

const chargeCreatedPublisher = async (payment: any) => {
  const paymentSerialize = JSON.stringify(payment);
  await producer.send({
    topic: 'charge-created',
    messages: [{ value: paymentSerialize }],
  });
  console.log('charge-created Produce 🔥');
};

export { chargeCreatedPublisher };
