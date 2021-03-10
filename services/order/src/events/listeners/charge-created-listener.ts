import { kafka } from '../../kafka-wrapper';
import { Order } from '../../models/orderModel';
import { orderUpdatedPublisher } from '../publishers/order-updated-publisher';

const chargeCreatedListener = async () => {
  const chargeCreatedConsume = kafka.consumer({
    groupId: 'order-charge-created-consume-group',
  });

  await chargeCreatedConsume.connect();
  await chargeCreatedConsume.subscribe({ topic: 'charge-created' });
  const consume = async () => {
    await chargeCreatedConsume.run({
      eachMessage: async ({ topic, partition, message }) => {
        const chargeCreatedData = JSON.parse(message.value.toString());

        const order = await Order.findById(chargeCreatedData.orderId);

        if (!order) {
          throw new Error('Order not found');
        }

        order.set({ status: 'succeeded' });
        await order.save();

        console.log('charge-created Consume 🔥');

        await orderUpdatedPublisher(order);
      },
    });
  };

  consume().catch((err) => console.error(err));
};

export { chargeCreatedListener };
