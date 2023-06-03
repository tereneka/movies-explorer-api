const rateLimit = require('express-rate-limit');
const { WINDOW_MS, MAX_REQUESTS_NUMBER } = require('../config');

module.exports = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS_NUMBER,
  standardHeaders: true,
  legacyHeaders: false,
});
