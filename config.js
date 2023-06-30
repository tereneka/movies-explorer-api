require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  MONGO_URL,
  WINDOW_MS = 900000,
  MAX_REQUESTS_NUMBER = 100,
  ALLOWED_CORS,
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URL: NODE_ENV === 'production'
    ? MONGO_URL : 'mongodb://localhost:27017/moviesdb',
  WINDOW_MS,
  MAX_REQUESTS_NUMBER,
  ALLOWED_CORS: ALLOWED_CORS.split(','),
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
