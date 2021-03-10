// @ts-nocheck
import { promisify } from 'util';
import { createClient } from 'redis';
import mongoose from 'mongoose';

const redisUrl = 'redis://book-redis-srv:6379';
const client = createClient(redisUrl);
client.hget = promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.hget(this.hashKey, key);

  if (cacheValue) {
    console.log('Cache!!!');
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  console.log('Not Cache!!!');

  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result));

  return result;
};

const clearHash = (hashKey) => {
  client.del(JSON.stringify(hashKey));
};

export { clearHash };
