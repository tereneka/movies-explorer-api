const { errMessage, errStatus } = require('./constants');
const NotFoundError = require('./errors/notFoundErr');

function sendData(res, data) {
  if (!data) {
    throw new NotFoundError(errMessage.NOT_FOUND);
  }
  res.status(errStatus.OK).send(data);
}

module.exports = { sendData };
