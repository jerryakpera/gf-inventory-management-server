import { body } from 'express-validator';

export const validatePassword = () => {
  return [
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .custom(async (password, { req }) => {
        // Password must contain number
        if (!/[0-9]/.test(password)) {
          throw new Error('Password must contain a number');
        }

        // Password must contain uppercase letter
        if (!/[A-Z]/.test(password)) {
          throw new Error('Password must contain an uppercase letter');
        }

        // Password must contain lowercase letter
        if (!/[a-z]/.test(password)) {
          throw new Error('Password must contain a lowercase letter');
        }

        // Password must contain special character
        if (!/[!~`@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
          throw new Error('Password must contain one special character');
        }
      }),
  ];
};
