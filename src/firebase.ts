import admin from 'firebase-admin';
import config from './config';

const serviceAccount = require(`../${config.serviceAccount}`);

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
