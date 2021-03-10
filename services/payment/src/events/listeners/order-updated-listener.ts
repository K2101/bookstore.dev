import { kafka } from '../../kafka-wrapper';
import { Order } from '../../models/orderModel';

const orderUpdatedListener = async () => {
  const orderUpdatedConsumer = kafka.consumer({
    groupId: 'payment-order-updated-consume-group',
  });

  await orderUpdatedConsumer.connect();
  await orderUpdatedConsumer.subscribe({ topic: 'order-updated' });
  const consume = async () => {
    await orderUpdatedConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const orderFromOrderService = JSON.parse(message.value.toString());

        const order = await Order.findByEvent(orderFromOrderService);

        if (!order) {
          throw new Error('Order not found');
        }

        order.set({ status: 'succeeded' });
        await order.save();

        console.log('order-updated Consume 🔥');
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { orderUpdatedListener };
