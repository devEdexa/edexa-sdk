import dotenv from 'dotenv';
if (!dotenv) throw new Error('Unable to use dot env lib');

const envFound = dotenv.config();
// This error should crash whole process
if (!envFound) throw new Error("⚠️ Couldn't find .env file ⚠️");

export default {
  CLIENT_ID: process.env.CLIENT_ID,
  SECRET_KEY: process.env.SECRET_KEY,
  INVALID_AUTH_TOKEN: process.env.INVALID_AUTH_TOKEN,
  IS_PRIVATE: process.env.IS_PRIVATE,
};
