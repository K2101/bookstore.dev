import { promisify } from 'util';
import { stub } from '../../stub';

const userCredentialsCall = async (jwt: string) => {
  const authRequest = {
    jwt,
  };

  stub.AuthFunction = promisify(stub.AuthFunction);

  return await stub.AuthFunction(authRequest);
};

export { userCredentialsCall };
