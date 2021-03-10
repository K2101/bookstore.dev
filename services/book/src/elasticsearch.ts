import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node:
    'http://elasticsearch1-elasticsearch-coordinating-only.default.svc.cluster.local:9200',
});

export { client as elasticSearchClient };
