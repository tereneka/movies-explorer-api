const mongoose = require('mongoose');

const { Error } = mongoose;
const BadRequestErr = require('../errors/badRequestErr');
const ConflictErr = require('../errors/conflictErr');
const { errMessage } = require('../constants');

module.exports = (err, req, res, next) => {
  if (err instanceof Error.CastError || err instanceof Error.ValidationError) {
    next(new BadRequestErr(errMessage.BAD_REQUEST));
  } else if (err.code === 11000) {
    next(new ConflictErr(errMessage.CONFLICT));
  } else {
    next(err);
  }
};
