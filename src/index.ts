import './firebase';
import config from '@src/config';
import { connectDB } from './database';
import { createServer } from '@src/app';

const { port, dbConnStr } = config;

const startServer = async () => {
  try {
    if (dbConnStr) {
      await connectDB(dbConnStr);
    }

    const app = await createServer();
    app.listen(port, () => {
      console.log(`GF Inventory System API is on port: ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
