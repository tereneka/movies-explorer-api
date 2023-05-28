const token = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationErr = require('../errors/authorizationErr');
const { errMessage } = require('../constants');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    throw new AuthorizationErr(errMessage.NEED_AUTH);
  }

  let payload;

  try {
    payload = token.verify(
      jwt,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new AuthorizationErr(errMessage.NEED_AUTH));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
