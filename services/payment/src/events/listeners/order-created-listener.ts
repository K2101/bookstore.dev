import { kafka } from '../../kafka-wrapper';
import { Order } from '../../models/orderModel';

const orderCreatedListener = async () => {
  const orderCreatedConsumer = kafka.consumer({
    groupId: 'payment-order-created-consume-group',
  });

  await orderCreatedConsumer.connect();
  await orderCreatedConsumer.subscribe({ topic: 'order-created' });
  const consume = async () => {
    await orderCreatedConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const orderFromOrderService = JSON.parse(message.value.toString());

        const order = Order.build({
          id: orderFromOrderService.id,
          userId: orderFromOrderService.userId,
          status: orderFromOrderService.status,
          totalPrice: orderFromOrderService.totalPrice,
          version: orderFromOrderService.version,
        });
        await order.save();

        console.log('order-created Consume 🔥');
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { orderCreatedListener };
