import { client } from '../cassandra';

const customerTable = async () => {
  await client.execute(
    `CREATE TABLE IF NOT EXISTS customer (id text PRIMARY KEY, address text, city text, country text,  postal_code text);`
  );
};

customerTable();

const createAndUpdateCustomerInfo = async (
  id: string,
  address: string,
  city: string,
  country: string,
  postalCode: string
) => {
  try {
    await client.execute(
      `INSERT INTO customer (id, address, city, country, postal_code) VALUES (?, ?, ?, ?, ?)`,
      [id, address, city, country, postalCode]
    );
    const customer = await client.execute(
      `SELECT * FROM customer WHERE id = ?`,
      [id]
    );

    return {
      id: customer.rows[0].id,
      address: customer.rows[0].address,
      city: customer.rows[0].city,
      country: customer.rows[0].country,
      postalCode: customer.rows[0].postal_code,
    };
  } catch (err) {
    throw new err();
  }
};

export { createAndUpdateCustomerInfo };
