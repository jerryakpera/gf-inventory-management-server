import express, { Request, Response } from 'express';

import { default as userRoutes } from './users';

const router = express.Router();

router.get('/health', async (req: Request, res: Response) => {
  return res.send('App is up!');
});

router.use('/users', userRoutes);

export default router;
