const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { loginValidator, registerValidator } = require('../validators/user');
const NotFoundErr = require('../errors/notFoundErr');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);

router.use(auth);

router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundErr('Неверный URL'));
});

module.exports = { router };
