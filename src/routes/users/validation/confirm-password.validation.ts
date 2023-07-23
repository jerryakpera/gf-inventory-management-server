import { body } from 'express-validator';

export const validateConfirmPassword = () => {
  return [
    body('confirmPassword')
      .isString()
      .withMessage('Confirm password must match password')
      .custom(async (confirmPassword, { req }) => {
        const { password } = req.body;

        if (password === confirmPassword) {
          return;
        }

        throw 'Passwords must match';
      }),
  ];
};
