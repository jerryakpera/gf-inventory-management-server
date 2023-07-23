import dotenv from 'dotenv-safe';

dotenv.config();

const { env } = process;

const config = {
  port: env.PORT,
  baseURL: env.BASE_URL,

  dbConnStr: env.MONGODB_CONN_STR,
  serviceAccount: env.SERVICE_ACCOUNT,
};

export default config;
