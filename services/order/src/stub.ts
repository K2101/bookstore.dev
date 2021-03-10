import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const PROTO_PATH = __dirname + '/authpb/auth.proto';

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const packageDescriptor = loadPackageDefinition(packageDefinition);
const auth = packageDescriptor.auth;

// @ts-ignore
const stub = new auth.Auth('auth-srv:3000', credentials.createInsecure());

export { stub };
