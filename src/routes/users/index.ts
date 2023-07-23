import express from 'express';

import * as utils from '@src/utils';
import * as userValidation from './validation';
import { userControllers } from '@src/controllers';
import { validate } from '@src/middleware/validate';

const router = express.Router();
router.post(
  '/register',
  userValidation.validateName(),
  userValidation.validateEmail(),
  userValidation.validatePassword(),
  userValidation.validateConfirmPassword(),
  validate,
  utils.use(userControllers.registerUser)
);

export default router;
