import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from './errorHandler';
import jwt from 'jsonwebtoken';

type UserPayload = {
  id: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.replace('Bearer ', '');
  }

  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    req.currentUser = payload;
    next();
  } catch (e) {
    next(e); // Pass the error to the error handling middleware
  }
};

module.exports = { authMiddleware };
