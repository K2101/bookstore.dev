import mongoose from 'mongoose';
import { app } from './app';
import { producer } from './kafka-wrapper';
import { orderCreatedListener } from './events/listeners/order-created-listener';
import { orderCancelledListener } from './events/listeners/order-cancelled-listener';

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.KAFKA_BROKER_IP_PRODUCER) {
    throw new Error('KAFKA_BROKER_IP_PRODUCER must be defined');
  }
  if (!process.env.KAFKA_BROKER_IP_CONSUMER) {
    throw new Error('KAFKA_BROKER_IP_CONSUMER must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  try {
    await producer.connect();

    orderCreatedListener();
    orderCancelledListener();

    console.log('Connected to Kafka');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
