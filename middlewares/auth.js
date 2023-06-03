const token = require('jsonwebtoken');

const AuthorizationErr = require('../errors/authorizationErr');
const { errMessage } = require('../constants');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(new AuthorizationErr(errMessage.NEED_AUTH));
    return;
  }

  let payload;

  try {
    payload = token.verify(
      jwt,
      JWT_SECRET,
    );
  } catch (err) {
    next(new AuthorizationErr(errMessage.NEED_AUTH));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
