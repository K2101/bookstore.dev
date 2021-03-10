import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'book',
  brokers: [process.env.KAFKA_BROKER_IP_PRODUCER],
});

const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: 'book-group' });

export { producer, kafka };
