import CustomError from '@src/errors/CustomError';
import { Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '@src/models/ErrorStatus';

const errorHandler = (err: ErrorStatus, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.send({
      errors: err.serializeErrors(),
    });
  }

  const errCode = err?.code!;
  const errMessage = err?.message;

  res.status(errCode || 500).send(errMessage || 'Oops! Something went wrong');
};

export default errorHandler;
