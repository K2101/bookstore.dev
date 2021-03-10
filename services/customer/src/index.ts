import { app } from './app';
import { keyspaceSetting, client } from './cassandra';

const start = async () => {
  if (!process.env.CASSANDRA_PASSWORD) {
    throw new Error('CASSANDRA_PASSWORD must be defined');
  }
  try {
    await keyspaceSetting();
    await client.connect();
    console.log('Connected to Cassandra');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
