import { Request, Response, NextFunction } from 'express';
import { userCredentialsCall } from '../../events/grpc/users-credentials';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }

  try {
    const jwt = req.headers.authorization.split(' ')[1];

    const payload: UserPayload = await userCredentialsCall(jwt);

    if (!payload.id || !payload.email) {
      return next();
    }

    req.currentUser = payload;
  } catch (err) {}

  next();
};
