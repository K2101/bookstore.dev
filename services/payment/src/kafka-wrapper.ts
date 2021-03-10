import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'order',
  brokers: [process.env.KAFKA_BROKER_IP_CONSUMER],
});

const producer = kafka.producer();

export { producer, kafka };
