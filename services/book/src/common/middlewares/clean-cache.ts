import { Request, Response, NextFunction } from 'express';
import { clearHash } from '../../services/cache';

export const cleanCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await next();

  await clearHash(req.params.id);
};
