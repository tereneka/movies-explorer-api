const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendData } = require('../utils');
const { errStatus } = require('../constants');
const { JWT_SECRET } = require('../config');

function sendCookie(res, user) {
  const token = jwt.sign(
    { _id: user._id },
    JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  res
    .cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
    .send(user);
}

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => sendData(res, user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => {
        res.status(errStatus.SUCCESS);
        sendCookie(res, user);
      })
      .catch(next);
  });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  }).then((user) => sendData(res, user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => sendCookie(res, user))
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
  logout,
};
