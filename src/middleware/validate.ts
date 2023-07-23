const { validationResult } = require('express-validator');
import { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any[] = [];
  errors.array().map((err: any) => extractedErrors.push(err.msg));

  return next({ code: 422, message: extractedErrors[0] });
};
