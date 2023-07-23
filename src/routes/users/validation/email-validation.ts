import { body } from 'express-validator';

export const validateEmail = () => {
  return [body('email').isEmail().withMessage('Please provide a valid email address')];
};
