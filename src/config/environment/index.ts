import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 4000;
export const gqlPath = process.env.GQL_PATH || '/graphql';

// You may use this as a boolean value for different situations
export const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};

export const jwtSecret = process.env.JWT_SECRET;

export const mongo = {
  db: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  uri: process.env.MONGO_URI,
};
