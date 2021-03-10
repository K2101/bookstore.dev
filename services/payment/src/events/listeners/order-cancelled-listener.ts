import { kafka } from '../../kafka-wrapper';
import { Order } from '../../models/orderModel';

const orderCancelledListener = async () => {
  const orderCreatedConsumer = kafka.consumer({
    groupId: 'payment-order-cancelled-consume-group',
  });

  await orderCreatedConsumer.connect();
  await orderCreatedConsumer.subscribe({ topic: 'order-cancelled' });
  const consume = async () => {
    await orderCreatedConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const orderFromOrderService = JSON.parse(message.value.toString());

        const order = await Order.findByEvent(orderFromOrderService);

        if (!order) {
          throw new Error('Order not found');
        }

        order.set({ status: 'cancelled' });
        await order.save();

        console.log('order-cancelled Consume 🔥');
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { orderCancelledListener };
