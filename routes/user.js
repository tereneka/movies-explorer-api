const userRouter = require('express').Router();
const {
  getUser, updateUser,
} = require('../controllers/user');
const { userProfileValidator } = require('../validators/user');

userRouter.get('/me', getUser);

userRouter.patch('/me', userProfileValidator, updateUser);

module.exports = userRouter;
