import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['customer-casssandra-srv'],
  localDataCenter: 'datacenter1',
  keyspace: 'bookstore',
});

const keyspaceSetting = async () => {
  await client.execute(
    `CREATE KEYSPACE IF NOT EXISTS bookstore WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`
  );
};

export { keyspaceSetting, client };
