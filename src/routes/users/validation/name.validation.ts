import { body } from 'express-validator';

import { VALIDATION } from '@src/config/settings';

export const validateName = () => {
  return [
    body('name')
      .isString()
      .withMessage('Please enter a name for the account')
      .isLength({ min: VALIDATION.minNameLength })
      .withMessage(`Name must be longer than ${VALIDATION.minNameLength} character(s)`)
      .isLength({ max: VALIDATION.maxNameLength })
      .withMessage(`Name must be shorter than ${VALIDATION.maxNameLength} character(s)`),
  ];
};
