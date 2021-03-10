import { NotFoundError } from '../errors/not-found-error';

export const notFound = async () => {
  throw new NotFoundError();
};
